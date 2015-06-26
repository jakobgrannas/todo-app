var Todo = require('mongoose').model('Todo');

exports.create = function (req, res, next) {
	var todo = new Todo(req.body);

	/// catch 404 and forwarding to error handler
	/*app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

/// error handlers

// development error handler
// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}*/

	todo.save(function (error) {
		if(error) {
			return next(error);
		}
		else {
			res.json({
				data: todo
			});
		}
	});
};

exports.list = function (req, res, next) {
	Todo.find({}, function (error, todoList) {
		if(error) {
			return next(error);
		}
		else {
			res.json({
				data: todoList
			});
		}
	});
};