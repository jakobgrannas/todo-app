var React = require('react'),
	PropTypes = React.PropTypes;

var Alert = React.createClass({
	propTypes: {
		clickHandler: PropTypes.func.isRequired,
		message: PropTypes.string.isRequired,
		classNames: PropTypes.string
	},
	render: function () {
		return (
			<div className={this.props.classNames}>
				<p className="alert__message">{this.props.message}</p>
				<span className="alert__close" onClick={this.props.clickHandler}></span>
			</div>
		);
	}
});

module.exports = Alert;