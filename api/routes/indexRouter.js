var indexController = require('../controllers/indexController');

module.exports = function (app) {
    app.get('/', indexController.render);
};