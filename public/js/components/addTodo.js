var React = require('react');

var AddTodo = React.createClass({
	getInitialState: function () {
		return {
			todoText: null
		}
	},
	render: function () {
		return (
			<section className="add-todo">
				<input type="text" className="textfield" placeholder="What needs to be done?" defaultValue={this.state.todoText} name="new-todo-text" id="new-todo-text" />
				<label htmlFor="new-todo-text" className="hidden">What needs to be done</label>
				<button type="submit" className="button--submit" onClick={this.props.addTodo}>Add Todo</button>
			</section>
		);
	}
});

module.exports = AddTodo;