var todoController = require('../controllers/todoController');

module.exports = function (app) {
	app.route('/todos')
		.get(todoController.list)
		.put(todoController.updateAll)
		.post(todoController.create);

	app.route('/todos/:id')
		.put(todoController.update);

	app.param('id', todoController.todoById);
};