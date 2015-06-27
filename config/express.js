var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	app = express(),
	defaults = {
		root: path.join(__dirname, '..')
	};

module.exports = function() {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

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

    return app;
};
