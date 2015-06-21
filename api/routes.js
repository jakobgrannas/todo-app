var indexPage = require('./controllers/indexController');

module.exports = function (app) {
    app.get('/', indexPage.render);

    /*app.post('/newDeploy', function (req, res) {
        newDeployController.sendMessage.call(newDeployController.sendMessage, req, res, io);
    });*/
};