const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

const title_data_filepath = './data/titles.json';
const court_orders_data_filepath = './data/court_orders.json';

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/court_orders', (req, res) => {
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

app.get('/court_orders/titles', (req, res) => {
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