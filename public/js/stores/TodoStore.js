var AppDispatcher = require('../dispatcher/AppDispatcher'),
	EventEmitter = require('events').EventEmitter,
	TodoConstants = require('../constants/TodoConstants'),
	update = require('react/lib/update');

// Define initial data points
var _todos = {
	data: []
};

function addTodo (todo) {
	_todos.data.push(todo.data);
}

function setState (state) {
	_todos = state;
}

function handleTodoResponse (response) {
	if (response === TodoConstants.REQUEST_PENDING) {
		console.log('Pending!');
	}
	else if (response === TodoConstants.REQUEST_TIMEOUT) {
		console.log('Timeout!');
	}
	else if (response === TodoConstants.REQUEST_ERROR) {
		console.log('Error');
	}
	else {
		setState(response.body);
	}
}

var TodoStore = update(EventEmitter.prototype, {$merge: {
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
}});

AppDispatcher.register(function (payload) {
	var action = payload.action;

	switch (action.actionType) {
		case TodoConstants.ADD_TODO:
			addTodo(action.response);

			break;
		case TodoConstants.GET_TODO_LIST:
			handleTodoResponse(action.response);

			break;
		default:
			return true;
	}

	TodoStore.emitChange();

	return true;

});

module.exports = TodoStore;
