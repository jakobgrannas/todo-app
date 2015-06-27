var React = require('react');

var AddTodo = React.createClass({
	getInitialState: function () {
		return {
			todoText: null
		}
	},
	handleInputChange: function (e) {
		this.setState({
			todoText: e.target.value
		});
	},
	handleClick: function () {
		this.props.clickHandler(this.state.todoText);
	},
	render: function () {
		return (
			<section className="add-todo">
				<input type="text" className="textfield" placeholder="What needs to be done?" onChange={this.handleInputChange} name="new-todo-text" id="new-todo-text" />
				<label htmlFor="new-todo-text" className="hidden">What needs to be done</label>
				<button type="submit" className="button--submit" onClick={this.handleClick}>Add Todo</button>
			</section>
		);
	}
});

module.exports = AddTodo;