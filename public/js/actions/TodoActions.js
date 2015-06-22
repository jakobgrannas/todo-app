var TodoAPI = require('../utils/TodoAPI');

var TodoActions = {
	addTodo: function (text) {
		TodoAPI.addTodo(text);
	},
	getTodoList: function () {
		TodoAPI.getTodoList();
	}
};

module.exports = TodoActions;

