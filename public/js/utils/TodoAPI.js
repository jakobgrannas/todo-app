var AppDispatcher = require('../dispatcher/AppDispatcher'),
	TodoConstants = require('../constants/TodoConstants'),
	TodoActions = require('../actions/TodoActions'),
	request = require('superagent'),
	_TIMEOUT = 10000,
	_pendingRequests = {};


function abortPendingRequests(key) {
	if (_pendingRequests[key]) {
		_pendingRequests[key]._callback = function(){};
		_pendingRequests[key].abort();
		_pendingRequests[key] = null;
	}
}

function dispatch(key, response, params) {
	var payload = {actionType: key, response: response};
	if (params) {
		payload.queryParams = params;
	}
	AppDispatcher.handleAction(payload)
}

// return successful response, else return request Constants
function makeDigestFun(key, params) { // TODO: Refactor this
	return function (err, response) {
		if (err && err.timeout === _TIMEOUT) {
			dispatch(key, TodoConstants.REQUEST_TIMEOUT, params);
		}
		else if (!response.ok) {
			dispatch(key, TodoConstants.REQUEST_ERROR, params);
		}
		else {

	/*
	if(key === TodoConstants.ADD_TODO) {
		var response = {
			data: {
				id: 'todo3',
				text: "I'm new here",
				order: 3,
				isChecked: false
			}
		}
	}
	else {
		var response = {
			// TODO: Mock data goes here!
			data: [
				{
					id: 'todo1',
					text: 'Something to do',
					order: 1,
					isChecked: true
				},
				{
					id: 'todo2',
					text: 'Something else to do',
					order: 2,
					isChecked: false
				}
			]
		};
	}*/
			dispatch(key, response, params);
		}
	};
}

function get(url) {
	return request
		.get(url)
		.timeout(_TIMEOUT);
}

function post(url, data) {
	return request
		.post(url)
		.send(data)
		.set('Accept', 'application/json');
}

module.exports = {

	getTodoList: function () { // TODO: Refactor this
		var url = '/todos',
			key = TodoConstants.GET_TODO_LIST;

		abortPendingRequests(key);

		dispatch(key, TodoConstants.REQUEST_PENDING);

		_pendingRequests[key] = get(url).end(
			makeDigestFun(key)
		);
	},
	addTodo: function (data) {
		var url = '/todos',
			key = TodoConstants.ADD_TODO;

		abortPendingRequests(key);
		dispatch(key, TodoConstants.REQUEST_PENDING, data);
		_pendingRequests[key] = post(url, data).end(
			makeDigestFun(key, data)
		);
	},
	saveList: function () {
		// Not yet implemented
	}

};