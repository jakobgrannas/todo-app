var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	text: String,
	order: Number,
	isChecked: Boolean
});

mongoose.model('Todo', TodoSchema);