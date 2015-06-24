var React = require('react'),
	classNames = require('classnames'),
	TodoActions = require('../actions/TodoActions'),
	TodoStore = require('../stores/TodoStore'),
	TodoConstants = require('../constants/TodoConstants'),
	DragSource = require('react-dnd').DragSource,
	DropTarget = require('react-dnd').DropTarget,
	PropTypes = React.PropTypes,
	flow = require('lodash/function/flow');

var dragSource = {
	beginDrag: function (props) {
		return {
			item: props.item
		};
	}
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

function dropCollect (connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		highlighted: monitor.canDrop(),
		hovered: monitor.isOver()
	}
}

var dropTarget = {
	hover: function (props, monitor) {
		var draggedId = monitor.getItem().item.id;

		if (draggedId !== props.item.id) {
			props.moveItem(monitor.getItem().item, props.item);
		}
	}
};

var SortableListItem = React.createClass({

	propTypes: {
		moveItem: PropTypes.func.isRequired,

		// Injected by React DnD:
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired
	},

	getInitialState: function () {
		return {
			isChecked: this.props.item.isChecked
		};
	},
	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},
	_onChange: function () {
		this.setState(TodoStore.getState());
	},
	onCheckboxCheck: function () {
		// TODO: Save state to BE
		this.setState({isChecked: event.target.checked});
	},
	render: function () {
		var isDragging = this.props.isDragging,
			connectDropTarget = this.props.connectDropTarget,
			connectDragSource = this.props.connectDragSource;

		return connectDragSource(connectDropTarget(
			<li className={classNames({
				'todo__item': true,
				'todo__item is-highlighted': this.props.highlighted,
				'todo__item is-hovered': this.props.hovered
			})}
				style={{ opacity: isDragging ? 0.5 : 1 }}>
				<input type="checkbox" className="checkbox" name="todo" id={this.props.item.id} checked={this.state.isChecked} onChange={this.onCheckboxCheck}/>
				<label htmlFor={this.props.item.id} className="checkbox-label">{this.props.item.text}</label>
			</li>
		));
	}
});

module.exports = flow(
	DragSource(TodoConstants.DRAG_TYPE_TODO, dragSource, collect),
	DropTarget(TodoConstants.DRAG_TYPE_TODO, dropTarget, dropCollect)
)(SortableListItem);