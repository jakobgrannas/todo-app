var AppDispatcher = require('../dispatcher/AppDispatcher'),
	TodoConstants = require('../constants/TodoConstants'),
	MessageConstants = require('../constants/MessageConstants'),
	request = require('superagent'),
	API_BASE_PATH = '/todos/',
	_TIMEOUT = 10000,
	_pendingRequests = {};


function abortPendingRequests (key) {
	if (_pendingRequests[key]) {
		_pendingRequests[key]._callback = function(){};
		_pendingRequests[key].abort();
		_pendingRequests[key] = null;
	}
}

function dispatch (key, response, options) {
	var payload = {actionType: key, response: response};
	if (options) {
		payload.options = options;
	}
	AppDispatcher.handleAction(payload);
}

function getUrl (params) {
	var extraParams = params || '';
	return API_BASE_PATH + extraParams;
}

function makeDigestFun (key, options) {
	return function (err, response) {
		var options = options || {};
		if (err && err.timeout === _TIMEOUT) {
			options.triggeredBy = key;
			dispatch(MessageConstants.REQUEST_TIMEOUT, response , options);
		}
		else if (!response.ok) {
			options.triggeredBy = key;
			dispatch(MessageConstants.REQUEST_ERROR, response, options);
		}
		else {
			dispatch(key, response, options);
		}
	};
}

function get (url) {
	return request
		.get(url)
		.timeout(_TIMEOUT);
}

function post (url, data) {
	return request
		.post(url)
		.send(data)
		.set('Accept', 'application/json')
		.timeout(_TIMEOUT);
}

function put (url, data) {
	return request
		.put(url)
		.send(data)
		.set('Accept', 'application/json')
		.timeout(_TIMEOUT);
}

module.exports = {
	getTodoList: function () {
		var url = getUrl(),
			key = TodoConstants.GET_TODO_LIST;

		abortPendingRequests(key);

		dispatch(MessageConstants.REQUEST_PENDING, null, {
			triggeredBy: key
		});

		_pendingRequests[key] = get(url).end(
			makeDigestFun(key)
		);
	},
	saveTodoList: function (list) {
		var url = getUrl(),
			key = TodoConstants.SAVE_TODO_LIST;

		abortPendingRequests(key);

		dispatch(MessageConstants.REQUEST_PENDING, null, {
			triggeredBy: key,
			data: list
		});


		_pendingRequests[key] = put(url, list).end(
			makeDigestFun(key, list)
		);
	},
	addTodo: function (data) {
		var url = getUrl(),
			key = TodoConstants.ADD_TODO;

		abortPendingRequests(key);

		dispatch(MessageConstants.REQUEST_PENDING, null, {
			triggeredBy: key,
			data: data
		});

		_pendingRequests[key] = post(url, data).end(
			makeDigestFun(key, data)
		);
	},
	saveTodo: function (data) {
		var url = getUrl(data._id),
			key = TodoConstants.SAVE_TODO;

		abortPendingRequests(key);

		dispatch(MessageConstants.REQUEST_PENDING, null, {
			triggeredBy: key,
			data: data
		});

		_pendingRequests[key] = put(url, data).end(
			makeDigestFun(key, data)
		);
	}
};