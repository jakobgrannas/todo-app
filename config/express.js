var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	app = express(),
	defaults = {
		root: path.join(__dirname, '..')
	};

// Error handler middleware
function errorHandler (error, req, res, next) {
	var data = {
		message: error.message,
		errors: error.errors
	};

	if (app.get('env') === 'development') {
		console.log(data);
	}

	res.status(error.status ||  500);
	res.json(data);
}

module.exports = function() {

	if(app.get('env') === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.json());
    app.use(methodOverride());

    // Set /public as the static content directory
    app.use(express.static(defaults.root + "/public"));

	[
		'indexRouter',
		'todosRouter'
	].map(function(routerName) {
		var router = require('../api/routes/' + routerName);
		router(app);
	});

	app.use(errorHandler);

    return app;
};
