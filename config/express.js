var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	app = express(),
	env = process.env.NODE_ENV,
	defaults = {
		root: path.join(__dirname, '..')
	};

module.exports = function() {

	if(env === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.json());
    app.use(methodOverride());

	if (env === 'development') {
		app.use(function(error, req, res, next) {
			res.status(error.status || 500);
			res.render('error', {
				message: error.message,
				error: error
			});
		});
	}

    // Set /public as the static content directory
    app.use(express.static(defaults.root + "/public"));

	[
		'indexRouter',
		'todosRouter'
	].map(function(routerName) {
		var router = require('../api/routes/' + routerName);
		router(app);
	});

    return app;
};
