var React = require('react'),
	AddTodo = require('./AddTodo'),
	TodoList = require('./TodoList'),
	Footer = require('./Footer'),
	TodoActions = require('../actions/TodoActions'),
	TodoStore = require('../stores/TodoStore'),
	update = require('react/lib/update');

var TodoApp = React.createClass({
	getInitialState: function () {
		return TodoStore.getState();
	},
	componentDidMount: function() {
		TodoStore.addChangeListener(this.onStoreChange);
		TodoActions.getTodoList();
	},
	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this.onStoreChange);
	},
	componentWillReceiveProps: function () {
		TodoActions.getTodoList();
	},
	onStoreChange: function () {
		this.setState(TodoStore.getState());
	},
	moveItem: function (itemId, afterId) {
		var listItems = this.state.data,
			item = listItems.filter(i => i.id === itemId)[0],
			afterItem = listItems.filter(i => i.id === afterId)[0],
			itemIndex = listItems.indexOf(item),
			afterIndex = listItems.indexOf(afterItem),
			sortedList = update(this.state.data, {
				$splice: [
					[itemIndex, 1],
					[afterIndex, 0, item]
				]
			});

		sortedList.map((item, i) => item.order = i);

		this.setState({
			data: sortedList
		});
	},
	markAllTodos: function () {
		var list = this.state.data;
		list.map(item => item.isChecked = true);

		this.setState({
			data: list
		});
	},
	updateList: function (itemId, isChecked) {
		var list = this.state.data,
			item = list.filter(i => i.id === itemId)[0],
		itemIndex = list.indexOf(item);

		if(itemIndex >= 0) {// TODO: What about new items that don't exist in the array?
			list[itemIndex].isChecked = isChecked;
		}
		else {
			// add item, or should it come directly from the BE?
		}

		this.setState({
			data: list
		});

		// TODO: Save state to BE
		// Solve re-ordering problem:
		// OPT #1: items.map(item.order: i)
		// OPT #2: save entire list as is upon endDrag
	},
	render: function () {
		var itemsLeft = this.state.data.length - this.state.data.filter(i => i.isChecked).length;

		return (
			<div className="modal">
				<header className="todo__header">
					<h1 className="todo__title">Todos</h1>
				</header>
				<main className="todo__content">
					<AddTodo clickHandler={this.addTodo} />
					<TodoList items={this.state.data} updateList={this.updateList} moveItem={this.moveItem} />
				</main>
				<Footer markAll={this.markAllTodos} itemsLeft={itemsLeft} />
			</div>
		);
	}
});

module.exports = TodoApp;