var React = require('react'),
	TodoActions = require('../actions/TodoActions'),
	TodoStore = require('../stores/TodoStore');

var TodoList = React.createClass({
	getInitialState: function () {
		return TodoStore.getState();
	},
	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
		TodoActions.getTodoList(); // TODO: Is this where I should put this?
	},
	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},
	componentWillReceiveProps: function () {
		TodoActions.getTodoList();
	},
	_onChange: function () {
		this.setState(TodoStore.getState());
	},
	render: function () {
		var todoItems = this.state.data.map(function (todoItem) {
			return (
				<li className="todo__item" key={todoItem.id}>
					<input type="checkbox" className="checkbox" name="todo" id={todoItem.id} />
					<label htmlFor={todoItem.id} className="checkbox-label">{todoItem.text}</label>
				</li>
			);
		});

		return (
			<ol className="todo__list">
				{todoItems}
			</ol>
		);
	}
});

module.exports = TodoList;