var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({ // TODO: Add validation and default values
	text: String,
	order: Number,
	isChecked: Boolean
});

mongoose.model('Todo', TodoSchema);