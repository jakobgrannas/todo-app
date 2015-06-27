var Todo = require('mongoose').model('Todo');

function createResponseObject (data) {
	return {
		data: data
	}
}

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
			res.json(createResponseObject(todo));
		}
	});
};

exports.list = function (req, res, next) {
	Todo.find({}, function (error, todoList) {
		if(error) {
			return next(error);
		}
		else {
			res.json(createResponseObject(todoList));
		}
	}).sort({order: 'asc'});
};

exports.updateAll = function (req, res, next) {
	if(!req.body instanceof Array) {
		return next(new Error("updateAll expects an array of items, " + typeof req.body + ' given'));
	}

	req.body.map(function (todo) {
		Todo.findByIdAndUpdate(
			todo._id,
			todo,
			function (error, todo) {
				if(error) {
					return next(error);
				}
			}
		);
	});

	Todo.find({}, function (error, todoList) {
		if(error) {
			return next(error);
		}
		else {
			res.json(createResponseObject(todoList));
		}
	}).sort({order: 'asc'});
};

// Middleware to handle the :id request parameter
exports.todoById = function (req, res, next, id) {
	Todo.findOne({
		_id: id
	}, function (error, todo) {
		if(error) {
			return next(error);
		}
		else {
			req.todo = todo;
			next();
		}
	})
};

exports.update = function (req, res, next) {
	Todo.findByIdAndUpdate(
		req.todo.id,
		{$set: req.body},
		{"new": true}, // Required for Mongoose/MongoDB to return the updated record
		function (error, todo) {
			if(error) {
				return next(error);
			}
			else {
				res.json(createResponseObject(todo));
			}
		}
	);
};