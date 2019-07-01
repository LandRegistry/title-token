const express = require('express');
const fs = require('fs');
const Web3 = require('web3')
const app = express();
const port = process.env.PORT || 5000;
const provider = new Web3.providers.HttpProvider("http://localhost:9545");
const contract = require("truffle-contract");

const titleCoreJSON = require('./client/src/contracts/TitleCore.json');
const titleDataFilepath = './data/titles.json';
const courtOrdersDataFilepath = './data/court_orders.json';

/************************************************************************************** 
 * Make sure that these addresses are updated whenever you re-deploy the network or contracts!
***************************************************************************************/
const issuerAccount = "0x8A0E1f0Ab6F9935DE68742dE6298f90a2B20CC1B";
const contractAddress = "0x5F4D93C9fd226FE4385f0EEb3605f386459d51a1"; 

const TitleCore = contract(titleCoreJSON);
TitleCore.setProvider(provider);

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

app.get('/court-orders', (req, res) => {
    fs.readFile(courtOrdersDataFilepath, function (err, data) {
        if(err) {
            return err;
        }
        try {
            res.send(data);
        } catch(exception) {
            return exception;
        }
    });
});

app.get('/court-orders/titles', (req, res) => {
    let courtOrders = [];
    fs.readFile(courtOrdersDataFilepath, function (err, courtOrdersData) {
        if(err) {
            return err;
        }
        try {
            const courtOrdersJson = JSON.parse(courtOrdersData.toString());
            courtOrders = courtOrdersJson;
            fs.readFile(titleDataFilepath, function (err, titlesData) {
                if(err) {
                    return err;
                }
                try {
                    const titlesJson = JSON.parse(titlesData.toString());
                    for (let courtOrder in courtOrders) {
                        courtOrders[courtOrder]['title'] = titlesJson[courtOrder];
                    }
                    res.send(courtOrders);
                } catch(exception) {
                    return exception;
                }
            });
            res.send(data);
        } catch(exception) {
            return exception;
        }
    });
});

app.get('/titles', (req, res) => {
    fs.readFile(titleDataFilepath, function (err, data) {
        if(err) {
            return err;
        }
        try {
            res.send(data);
        } catch(exception) {
            return exception;
        }
    });
});

app.get('/titles/:titleId', (req, res) => {
    fs.readFile(titleDataFilepath, function (err, data) {
        const titlesJson = JSON.parse(data.toString());
        if(err) {
            return err;
        }
        try {
            let titleJson = titlesJson[req.params.titleId.toUpperCase()];
            res.send(titleJson);
        } catch(exception) {
            return exception;
        }
    });
});

app.post('/request-token', (req, res) => {
    const body = req.body;
    console.log(body);
    TitleCore.at(contractAddress)
        .then(function(instance) {
            titleCore = instance;
            titleCore.issueTitleToken(body.owner, body.titleId, {from: issuerAccount})
                .then(function (result) {

                    //  Since making a new transaction doesn't return a result, call the titleIdToTokenIndex 
                    // mapping to get its tokenId
                    titleCore.titleIdToTokenIndex.call(body.titleId)
                        .then(function (tokenId) {
                            res.send(tokenId);
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).send({
                                'error': error
                            });
                        })
                })
            .catch(error => {
                console.log(error);
                res.status(400).send({
                    'error': error
                })
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({
                'error': error
            })
        });
});

