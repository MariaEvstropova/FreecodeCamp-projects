var React = require('react');
require('./css/counter.css');

var Counter = React.createClass({
	render: function(){
		return (<div className="counter">{this.props.data}</div>);
	}
});

module.exports = Counter;