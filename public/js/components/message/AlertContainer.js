var React = require('react/addons'),
	ReactTransitionGroup = React.addons.CSSTransitionGroup,
	MessageStore = require('../../stores/MessageStore'),
	Alert = require('./Alert'),
	MessageActions = require('../../actions/MessageActions');

var AlertContainer = React.createClass({
	getInitialState: function () {
		return {
			messages: MessageStore.getState()
		};
	},
	componentDidMount: function() {
		MessageStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount: function () {
		MessageStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange: function () {
		this.setState({
			messages: MessageStore.getState()
		});
	},
	removeMessage: function (index) {
		MessageActions.removeMessage(index);
	},
	render: function () {
		var classNames;
		return (
			<ReactTransitionGroup component="div" transitionName="fade-slide">
				{this.state.messages.map(function (message, i) {
					classNames = 'alert alert--' + message.type;
					return (
						<Alert
							key={i}
							classNames={classNames}
							message={message.message}
							clickHandler={this.removeMessage.bind(this, i)}
						/>
					)
				}, this)}
			</ReactTransitionGroup>
		);

	}
});

module.exports = AlertContainer;