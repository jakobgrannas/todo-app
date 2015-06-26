var mongoose = require('mongoose'),
	mongoUrl = 'mongodb://localhost/todoapp';

module.exports = function () {
	var db = mongoose.connect(mongoUrl);

	require('../api/models/todoModel');

	return db;
};