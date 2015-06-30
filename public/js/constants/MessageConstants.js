var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	REQUEST_PENDING: null,
	REQUEST_ERROR: null,
	REQUEST_TIMEOUT: null,
	REQUEST_SUCCESS: null,

	REMOVE_MESSAGE: null
});