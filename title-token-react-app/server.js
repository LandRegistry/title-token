require('dotenv').config({path: '../.env'})

const express = require('express');
const fs = require('fs');
const Web3 = require('web3')
const app = express();
const port = process.env.PORT || 5000;
const provider = new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER);
const EthereumTx = require('ethereumjs-tx').Transaction

const titleCoreJSON = require('./client/src/contracts/TitleCore.json');
const titleDataFilepath = process.env.TITLE_DATA_FILEPATH;
const courtOrdersDataFilepath = process.env.COURT_ORDER_DATA_FILEPATH;

const privateKey = Buffer.from(fs.readFileSync(process.env.PRIVATE_KEY_LOCATION, 'utf-8'), 'hex');
const issuerAccount = process.env.ISSUER_ACCOUNT;
const contractAddress = process.env.CONTRACT_ADDRESS; 

const web3 = new Web3(provider);

const titleCoreContract = new web3.eth.Contract(titleCoreJSON.abi, contractAddress, {
    from: issuerAccount,
    gas: 500000
});

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

    web3.eth.getTransactionCount(issuerAccount)
        .then(nonce => {
            const functionAbi = titleCoreContract.methods.issueTitleToken(body.owner, body.titleId).encodeABI()
            
            let estimatedGas
            titleCoreContract.methods.issueTitleToken(body.owner, body.titleId).estimateGas({
            from: issuerAccount,
            }).then((gasAmount) => {
            estimatedGas = gasAmount.toString(16)
            })

            console.log(nonce)
            console.log(estimatedGas)

            const txParams = {
                nonce: nonce,
                gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
                // gasPrice: '0x' + estimatedGas,
                // gasPrice: ,
                gasLimit: 500000,
                to: contractAddress,
                value: 0,
                data: functionAbi
            }

            const tx = new EthereumTx(txParams, {chain: 'rinkeby', 'hardfork': 'petersburg'})
            tx.sign(privateKey);
            const serialisedTx = tx.serialize()
            web3.eth.sendSignedTransaction('0x' + serialisedTx.toString('hex'))
                .then(function (receipt) {
                    console.log("Transaction receipt: ", receipt)
                    titleCoreContract.methods.titleIdToTokenIndex(body.titleId).call()
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
    })
})

