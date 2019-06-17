const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

const data_filepath = './data/data.json';

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/data', (req, res) => {
    console.log(req);
    fs.readFile(data_filepath, function (err, data) {
        if(err) {
            return err;
        }
        try {
            res.send({'data': data});
        } catch(exception) {
            return exception;
        }
    });
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});