var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	ADD_TODO: null,
	GET_TODO_LIST: null,

	REQUEST_PENDING: null,
	REQUEST_ERROR: null,
	REQUEST_TIMEOUT: null
});