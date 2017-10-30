/* jshint node:true */

const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const passporte = require('passport');

module.exports = () => {
  let app = express();

  app.set('port',process.env.PORT || 3000);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  //app.use(morgan('dev'));
  app.use(passporte.initialize());


 load('models', {cwd: 'app'})
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};
