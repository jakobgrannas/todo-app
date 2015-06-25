var React = require('react'),
	classNames = require('classnames'),
	TodoConstants = require('../constants/TodoConstants'),
	DragSource = require('react-dnd').DragSource,
	DropTarget = require('react-dnd').DropTarget,
	PropTypes = React.PropTypes,
	flow = require('lodash.flow');

var dragSource = {
	beginDrag: function (props) {
		// Make only this data available to the drop target(s)
		return {
			id: props.id
		};
	},
	endDrag: function (props, monitor) {
		// If the drop was actually handled by a target, not just dropped outside the list
		if(monitor.didDrop()) {
			props.updateList();
		}
	}
};

/**
 * Specifies the props to inject into your component.
 */
function dragCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

function dropCollect (connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isHovered: monitor.isOver()
	}
}

var dropTarget = {
	hover: function (props, monitor) {
		var draggedId = monitor.getItem().id;

		if (draggedId !== props.id) {
			props.moveItem(monitor.getItem().id, props.id);
		}
	}
};

var SortableListItem = React.createClass({
	propTypes: {
		moveItem: PropTypes.func.isRequired,
		updateList: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		isChecked: PropTypes.bool.isRequired,

		// Injected by React DnD:
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired
	},
	handleChange: function () {
		var isChecked = event.target.checked;
		this.props.updateList(this.props.id, isChecked);
	},
	render: function () {
		var isDragging = this.props.isDragging,
			isHovered = this.props.isHovered,
			connectDropTarget = this.props.connectDropTarget,
			connectDragSource = this.props.connectDragSource;

		return connectDragSource(connectDropTarget(
			<li className={classNames({
				'todo__item': true,
				'is-hovered': isHovered,
				'is-dragging': isDragging
			})}>
				<input type="checkbox" className="checkbox" name="todo" id={this.props.id} checked={this.props.isChecked} onChange={this.handleChange} />
				<label htmlFor={this.props.id} className="checkbox-label">{this.props.text}</label>
			</li>
		));
	}
});

module.exports = flow(
	DragSource(TodoConstants.DRAG_TYPE_TODO, dragSource, dragCollect),
	DropTarget(TodoConstants.DRAG_TYPE_TODO, dropTarget, dropCollect)
)(SortableListItem);