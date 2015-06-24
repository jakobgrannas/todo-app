var AppDispatcher = require('../dispatcher/AppDispatcher'),
	TodoConstants = require('../constants/TodoConstants'),
	TodoActions = require('../actions/TodoActions'),
	API_URL = '/api/v2',
	_TIMEOUT = 10000,
	_pendingRequests = {};


function abortPendingRequests(key) {
	if (_pendingRequests[key]) {
		_pendingRequests[key]._callback = function(){};
		_pendingRequests[key].abort();
		_pendingRequests[key] = null;
	}
}

function makeUrl(part) {
	return API_URL + part;
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
	/*return function (err, response) {
		if (err && err.timeout === _TIMEOUT) {
			dispatch(key, TodoConstants.REQUEST_TIMEOUT, params);
		}
		else if (!response.ok) {
			dispatch(key, TodoConstants.REQUEST_ERROR, params);
		}
		else {*/

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
	}
			dispatch(key, response, params);
		/*}
	};*/
}

// a get request with an authtoken param
function get(url) {
	return request
		.get(url)
		.timeout(TIMEOUT)
		.query({authtoken: token()}); // TODO: Remove this
}

module.exports = {

	getTodoList: function () { // TODO: Refactor this
		//var url = makeUrl("/entities/" + entityId);
		var key = TodoConstants.GET_TODO_LIST;
		var params = {};
		abortPendingRequests(key);
		//dispatch(key, TodoConstants.REQUEST_PENDING, params);
		//_pendingRequests[key] = get(url).end(
			makeDigestFun(key, params);
		//);
	},
	addTodo: function () {
		//var url = makeUrl("/entities/" + entityId);
		var key = TodoConstants.ADD_TODO;
		var params = {};
		abortPendingRequests(key);
		//dispatch(key, TodoConstants.REQUEST_PENDING, params);
		//_pendingRequests[key] = get(url).end(
		makeDigestFun(key, params);
		//);
	},
	saveList: function () {
		// Not yet implemented
	}

};