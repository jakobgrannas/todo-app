var AppDispatcher = require('../dispatcher/AppDispatcher'),
	MessageConstants = require('../constants/MessageConstants');

var MessageActions = {
	removeMessage: function (index) {
		AppDispatcher.handleAction({
			actionType: MessageConstants.REMOVE_MESSAGE,
			messageIndex: index
		});
	}
};

module.exports = MessageActions;

