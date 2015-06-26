var React = require('react'),
	PropTypes = React.PropTypes;

var Footer = React.createClass({
	propTypes: {
		markAll: PropTypes.func.isRequired,
		itemsLeft: PropTypes.number.isRequired
	},
	handleClick: function (e) {
		e.preventDefault();
		this.props.markAll();
	},
	render: function () {
		return (
			<footer className="todo__footer">
				<span className="items-left">{this.props.itemsLeft} items left</span>
				<a href="#" className="link mark-all" onClick={this.handleClick}>Mark all as complete</a>
			</footer>
		);
	}
});

module.exports = Footer;