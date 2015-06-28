var AppDispatcher = require('../dispatcher/AppDispatcher'),
	EventEmitter = require('events').EventEmitter,
	TodoConstants = require('../constants/TodoConstants'),
	update = require('react/lib/update'),
	_todos = [], // This is where we store our internal state
	_status = TodoConstants.REQUEST_SUCCESS;

function addTodo (todo) {
	_todos.push(todo);
}

function saveTodo (todo) {
	var todoIndex = _todos.indexOf(todo._id);
	_todos[todoIndex] = todo;
}

function setState (state) {
	_todos = state;
}

function handleTodoResponse (response, successCallback) {
	_status = response;

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
		_status = TodoConstants.REQUEST_SUCCESS;
		successCallback(response.body.data);
	}
}

var TodoStore = update(EventEmitter.prototype, {$merge: {
	getState: function () {
		return _todos;
	},
	getStatus: function () {
		return _status;
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
			handleTodoResponse(action.response, addTodo);
			break;
		case TodoConstants.SAVE_TODO:
			handleTodoResponse(action.response, saveTodo);
			break;
		case TodoConstants.SAVE_TODO_LIST:
			handleTodoResponse(action.response, setState);
			break;
		case TodoConstants.GET_TODO_LIST:
			handleTodoResponse(action.response, setState);
			break;
		default:
			return true;
	}

	TodoStore.emitChange();

	return true;

});

module.exports = TodoStore;
