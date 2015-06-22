var React = require('react');

var Footer = React.createClass({
	render: function () {
		return (
			<footer className="todo__footer">
				<span className="items-left">2 items left</span>
				<a href="#" className="link mark-all">Mark all as complete</a>
			</footer>
		);
	}
});

module.exports = Footer;