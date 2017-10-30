/* jshint node:true */

const fs = require('fs');
const https = require('https');

var app = require('./config/express')();
require('./config/database.js')(process.env.MONGODB||'mongodb://localhost/cs-desafio-node');

let privateKey = fs.readFileSync('ssl.key').toString();
let certificate = fs.readFileSync('ssl.crt').toString();

const option = {
    key: privateKey,
    cert: certificate
};

https.createServer(option, app).listen(app.get('port'), ()=>(console.log(app.get('port'))));