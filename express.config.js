module.exports = function() {
    var express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        app = express(),
        defaults = {
            root: path.normalize(__dirname)
        };

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    // Set /public as our static content dir
    app.use(express.static(defaults.root + "/public"));

    require('./api/routes')(app);

    return app;
};