/* jshint node:true */

const fs = require('fs');
const http = require('http');

var app = require('./config/express')();
require('./config/database.js')(process.env.MONGODB||'mongodb://localhost/cs-desafio-node');

let privateKey = fs.readFileSync('ssl.key').toString();
let certificate = fs.readFileSync('ssl.crt').toString();

http.createServer(option, app).listen(app.get('port'), ()=>(console.log(app.get('port'))));
