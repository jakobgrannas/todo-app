var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	ADD_TODO: null,
	SAVE_TODO: null,
	GET_TODO_LIST: null,
	SAVE_TODO_LIST: null,

	// Drag & Drop
	DRAG_TYPE_TODO: null
});