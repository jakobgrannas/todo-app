var AppDispatcher = require('../dispatcher/AppDispatcher'),
	EventEmitter = require('events').EventEmitter,
	TodoConstants = require('../constants/TodoConstants'),
	update = require('react/lib/update'),
	_todos = [], // This is where we store our internal state
	_latestRequestStatus = TodoConstants.REQUEST_SUCCESS;

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

var TodoStore = update(EventEmitter.prototype, {$merge: {
	getState: function () {
		return _todos;
	},
	getStatus: function () {
		return _latestRequestStatus;
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
			addTodo(action.response.body.data);
			break;
		case TodoConstants.SAVE_TODO:
			saveTodo(action.response.body.data);
			break;
		case TodoConstants.SAVE_TODO_LIST:
			setState(action.response.body.data);
			break;
		case TodoConstants.GET_TODO_LIST:
			setState(action.response.body.data);
			break;
		default:
			return true;
	}

	TodoStore.emitChange();

	return true;

});

module.exports = TodoStore;
