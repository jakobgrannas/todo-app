var express = require('./config/express'),
    http = require('http'),
    port = 1337,
	mongoose = require('./config/mongoose'),
    app;

mongoose();
app = express();

// Start server
http.createServer(app).listen(port, function () {
   console.log('Server started on http://localhost:' + port);
});

module.exports = app;