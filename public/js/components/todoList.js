var React = require('react'),
	TodoActions = require('../actions/TodoActions'),
	TodoStore = require('../stores/TodoStore'),
	update = require('react/lib/update'),
	//TodoConstants = require('../constants/TodoConstants'),
	SortableListItem = require('./SortableListItem'),
	HTML5Backend = require('react-dnd/modules/backends/HTML5'),
	DragDropContext = require('react-dnd').DragDropContext;

var TodoList = React.createClass({
	getInitialState: function () {
		return TodoStore.getState();
	},
	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
		TodoActions.getTodoList(); // TODO: Is this really a good place to put this?
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
	moveItem: function (item, afterItem) {
		var listItems = this.state.data,
			itemId = item.id,
			afterId = afterItem.id,
			item = listItems.filter(i => i.id === itemId)[0],
			afterItem = listItems.filter(i => i.id === afterId)[0],
			itemIndex = listItems.indexOf(item),
			afterIndex = listItems.indexOf(afterItem);

		this.setState(update(this.state, {
			data: {
				$splice: [
					[itemIndex, 1],
					[afterIndex, 0, item]
				]
			}
		}));
	},
	render: function () {
		var todoItems = this.state.data.map(function (todoItem, i) {
			return (
				<SortableListItem
					key={i}
					moveItem={this.moveItem}
					item={todoItem} />
			);
		}, this);

		return (
			<ol className="todo__list">
				{todoItems}
			</ol>
		);
	}
});

module.exports = DragDropContext(HTML5Backend)(TodoList);