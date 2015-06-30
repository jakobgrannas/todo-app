var React = require('react'),
	AlertContainer = require('./message/AlertContainer'),
	TodoApp = require('./TodoApp');

var App = React.createClass({
	render: function () {
		return (
			<div className="app-container">
				<AlertContainer />
				<TodoApp />
			</div>
		);
	}
});

module.exports = App;