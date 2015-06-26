var React = require('react'),
	SortableListItem = require('./SortableListItem'),
	HTML5Backend = require('react-dnd/modules/backends/HTML5'),
	DragDropContext = require('react-dnd').DragDropContext;

var TodoList = React.createClass({
	render: function () {
		var todoItems = this.props.items.map(function (todoItem, i) {
			return (
				<SortableListItem
					key={i}
					moveItem={this.props.moveItem}
					updateList={this.props.updateList}
					id={todoItem['_id']}
					text={todoItem.text}
					isChecked={todoItem.isChecked}
				/>
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