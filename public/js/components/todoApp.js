var React = require('react'),
	AddTodo = require('./AddTodo'),
	TodoList = require('./TodoList'),
	Footer = require('./Footer');

var TodoApp = React.createClass({
	render: function () {
		return (
			<div className="modal">
				<header className="todo__header">
					<h1 className="todo__title">Todos</h1>
				</header>
				<main className="todo__content">
					<AddTodo />
					<TodoList />
				</main>
				<Footer />
			</div>
		);
	}
});

module.exports = TodoApp;