var AppDispatcher = require('../dispatcher/AppDispatcher'),
	EventEmitter = require('events').EventEmitter,
	MessageConstants = require('../constants/MessageConstants'),
	update = require('react/lib/update'),
	_messages = [];

function setState (state) {
	_messages = state;
}

function addMessage (message) {
	_messages.push(message);
}

function removeMessage (index) {
	_messages.splice(index, 1);
}

var MessageStore = update(EventEmitter.prototype, {$merge: {
	getState: function () {
		return _messages;
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
		case MessageConstants.REQUEST_ERROR:
			addMessage({
				type: 'error',
				message: action.response.body.message
			});
			break;
		case MessageConstants.REMOVE_MESSAGE:
			removeMessage(action.index);
			break;
		default:
			return true;
	}

	MessageStore.emitChange();

	return true;

});

module.exports = MessageStore;
