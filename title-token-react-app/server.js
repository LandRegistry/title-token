const express = require('express');
const fs = require('fs');
const Web3 = require('web3')
const app = express();
const port = process.env.PORT || 5000;
const provider = new Web3.providers.HttpProvider("http://localhost:9545");
const contract = require("truffle-contract");

const titleCoreJSON = require('./client/src/contracts/TitleCore.json');
const title_data_filepath = './data/titles.json';
const court_orders_data_filepath = './data/court_orders.json';


/************************************************************************************** 
 * Make sure that these addresses are updated whenever you re-deploy the network or contracts!
***************************************************************************************/
const issuer_account = "0x8A0E1f0Ab6F9935DE68742dE6298f90a2B20CC1B";
const contract_address = "0x67b1f682B793eF3f3B5b3Ee80e3E3768c63C28A0"; 

const TitleCore = contract(titleCoreJSON);
TitleCore.setProvider(provider);

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

app.get('/court-orders', (req, res) => {
    fs.readFile(court_orders_data_filepath, function (err, data) {
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
    let court_orders = [];
    fs.readFile(court_orders_data_filepath, function (err, court_orders_data) {
        if(err) {
            return err;
        }
        try {
            const court_orders_json = JSON.parse(court_orders_data.toString());
            court_orders = court_orders_json;
            fs.readFile(title_data_filepath, function (err, titles_data) {
                if(err) {
                    return err;
                }
                try {
                    const titles_json = JSON.parse(titles_data.toString());
                    for (let court_order in court_orders) {
                        court_orders[court_order]['title'] = titles_json[court_order];
                    }
                    res.send(court_orders);
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
    fs.readFile(title_data_filepath, function (err, data) {
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

app.post('/request-token', (req, res) => {
    const body = req.body;
    console.log(body);
    TitleCore.at(contract_address)
        .then(function(instance) {
            titleCore = instance;
            titleCore.issueTitleToken(body.owner, body.titleId, {from: issuer_account})
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

