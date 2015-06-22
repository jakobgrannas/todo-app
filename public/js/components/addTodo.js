var React = require('react'),
	TodoActions = require('../actions/TodoActions');

var AddTodo = React.createClass({
	getInitialState: function () {
		return {
			todoText: null
		}
	},
	addTodo: function () {
		TodoActions.addTodo(this.state.todoText);
	},
	render: function () {
		return (
			<section className="add-todo">
				<input type="text" className="textfield" placeholder="What needs to be done?" defaultValue={this.state.todoText} name="new-todo-text" id="new-todo-text" />
				<label htmlFor="new-todo-text" className="hidden">What needs to be done</label>
				<button type="submit" className="button--submit" onClick={this.addTodo}>Add Todo</button>
			</section>
		);
	}
});

module.exports = AddTodo;