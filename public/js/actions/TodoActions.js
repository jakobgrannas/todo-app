var TodoAPI = require('../utils/TodoAPI');

var TodoActions = {
	addTodo: function (data) {
		TodoAPI.addTodo(data);
	},
	getTodoList: function () {
		TodoAPI.getTodoList();
	}
};

module.exports = TodoActions;

