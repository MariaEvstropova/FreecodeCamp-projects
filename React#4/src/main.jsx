var ReactDom = require('react-dom');
var React = require('react');
var App = require('./components/App.jsx');

ReactDom.render(
    <App />,
    document.getElementById('mount-point')
);