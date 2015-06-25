var AppDispatcher = require('../dispatcher/AppDispatcher'),
	EventEmitter = require('events').EventEmitter,
	TodoConstants = require('../constants/TodoConstants'),
	_ = require('lodash');

// Define initial data points
var _todos = {
	data: []
};

function addTodo (todo) {
	_todos.data.push(todo.data);
}

function setState(state) {
	_todos = state;
}

var TodoStore = _.assign({}, EventEmitter.prototype, {
	getState: function () {
		return _todos;
	},
	emitChange: function () {
		this.emit('change');
	},
	addChangeListener: function (callback) {
		this.on('change', callback);
	},
	removeChangeListener: function (callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function (payload) {
	var action = payload.action;

	switch (action.actionType) {
		case TodoConstants.ADD_TODO:
			addTodo(action.response);

			break;
		case TodoConstants.GET_TODO_LIST:
			setState(action.response);

			break;
		default:
			return true;
	}

	TodoStore.emitChange();

	return true;

});

module.exports = TodoStore;
