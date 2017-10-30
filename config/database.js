/* jshint node:true */
let mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.Promise = global.Promise;
	mongoose.connect(uri, { useMongoClient: true});

	mongoose.connection.on('connected', function() {
	  console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
	  console.log('Mongoose! Disconnected from ' + uri);
	});

	mongoose.connection.on('error', function(erro) {
	  console.log('Mongoose! Connection Error: ' + erro);
	});

	process.on('SIGINT', function() {
  	  mongoose.connection.close(function() {
        console.log('Mongoose! Disconnected by application termination');
        process.exit(0);
      });
    });
};