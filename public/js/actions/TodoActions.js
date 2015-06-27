var TodoAPI = require('../utils/TodoAPI');

var TodoActions = {
	addTodo: function (data) {
		TodoAPI.addTodo(data);
	},
	getTodoList: function () {
		TodoAPI.getTodoList();
	},
	saveTodo: function (data) {
		TodoAPI.saveTodo(data);
	},
	saveTodoList: function (list) {
		TodoAPI.saveTodoList(list);
	}
};

module.exports = TodoActions;

