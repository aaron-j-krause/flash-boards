'use strict';

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <header>
        <Link to="thread">Thread</Link>
      </header>
    );
  }
})