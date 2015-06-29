var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	order: {
		type: Number,
		required: true
	},
	isChecked: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Todo', TodoSchema);