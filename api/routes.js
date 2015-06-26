var indexController = require('./controllers/indexController'),
	todoController = require('./controllers/todoController');

module.exports = function (app) {
    app.get('/', indexController.render);

	app.route('/todos')
		.get(todoController.list)
		.post(todoController.create);
};