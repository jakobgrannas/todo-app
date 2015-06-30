var React = require('react'),
	AddTodo = require('./AddTodo'),
	TodoList = require('./TodoList'),
	Footer = require('./Footer'),
	TodoActions = require('../actions/TodoActions'),
	TodoStore = require('../stores/TodoStore'),
	update = require('react/lib/update');

var TodoApp = React.createClass({
	getInitialState: function () {
		return {
			data: TodoStore.getState()
		}
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
		this.setState({
			data: TodoStore.getState()
		});
	},
	moveItem: function (itemId, afterId) {
		var listItems = this.state.data,
			item = listItems.filter(i => i._id === itemId)[0],
			afterItem = listItems.filter(i => i._id === afterId)[0],
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

		TodoActions.saveTodoList(list);
	},
	saveTodoList: function () {
		TodoActions.saveTodoList(this.state.data);
	},
	updateTodo: function (itemId, isChecked) {
		var list = this.state.data,
			item = list.filter(i => i._id === itemId)[0],
		itemIndex = list.indexOf(item);

		if(itemIndex >= 0) {
			list[itemIndex].isChecked = isChecked;
		}

		this.setState({
			data: list
		});

		TodoActions.saveTodo(item);
	},
	addTodo: function (text) {
		TodoActions.addTodo({
			text: text,
			order: this.state.data.length,
			isChecked: false
		});
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
					<TodoList items={this.state.data} updateList={this.saveTodoList} updateItem={this.updateTodo} moveItem={this.moveItem} />
				</main>
				<Footer markAll={this.markAllTodos} itemsLeft={itemsLeft} />
			</div>
		);
	}
});

module.exports = TodoApp;