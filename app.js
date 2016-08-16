/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var routes = require('./routes/pasos.js');
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req);
  var err = new Error('No encontrado');
  err.status = 404;
  next(err);
});
/*app.use(function(err, req, res, next) {
	var error = {
		      code: err.code || 500,
		      error: err.error || err.message
		    };
	console.log('error:', error);
	res.status(error.code).json(error);
});*/

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
