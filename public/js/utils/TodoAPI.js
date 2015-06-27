var AppDispatcher = require('../dispatcher/AppDispatcher'),
	TodoConstants = require('../constants/TodoConstants'),
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

function dispatch (key, response, params) {
	var payload = {actionType: key, response: response};
	if (params) {
		payload.queryParams = params;
	}
	AppDispatcher.handleAction(payload)
}

function getUrl (params) {
	var extraParams = params || '';
	return API_BASE_PATH + extraParams;
}

// return successful response, else return request Constants
function makeDigestFun (key, params) {
	return function (err, response) {
		if (err && err.timeout === _TIMEOUT) {
			dispatch(key, TodoConstants.REQUEST_TIMEOUT, params);
		}
		else if (!response.ok) {
			dispatch(key, TodoConstants.REQUEST_ERROR, params);
		}
		else {
			dispatch(key, response, params);
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
		.set('Accept', 'application/json');
}

function put (url, data) {
	return request
		.put(url)
		.send(data)
		.set('Accept', 'application/json');
}

module.exports = {
	getTodoList: function () {
		var url = getUrl(),
			key = TodoConstants.GET_TODO_LIST;

		abortPendingRequests(key);

		dispatch(key, TodoConstants.REQUEST_PENDING);

		_pendingRequests[key] = get(url).end(
			makeDigestFun(key)
		);
	},
	saveTodoList: function (list) {
		var url = getUrl(),
			key = TodoConstants.SAVE_TODO_LIST;

		abortPendingRequests(key);

		dispatch(key, TodoConstants.REQUEST_PENDING, list);

		_pendingRequests[key] = put(url, list).end(
			makeDigestFun(key, list)
		);
	},
	addTodo: function (data) {
		var url = getUrl(),
			key = TodoConstants.ADD_TODO;

		abortPendingRequests(key);

		dispatch(key, TodoConstants.REQUEST_PENDING, data);

		_pendingRequests[key] = post(url, data).end(
			makeDigestFun(key, data)
		);
	},
	saveTodo: function (data) {
		var url = getUrl(data._id),
			key = TodoConstants.SAVE_TODO;

		abortPendingRequests(key);

		dispatch(key, TodoConstants.REQUEST_PENDING, data);

		_pendingRequests[key] = put(url, data).end(
			makeDigestFun(key, data)
		);
	}
};