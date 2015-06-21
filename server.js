var express = require('./express.config'),
    http = require('http'),
    port = 1337,
    app = express(),
    server = http.createServer(app);


// Start server
server.listen(port, function () {
   console.log('Server started on http://localhost:' + port);
});

module.exports = app;