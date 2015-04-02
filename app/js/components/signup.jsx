'use strict';

var React = require('react');

var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div className='welcome'>
        <h1>SIGN UP OR SOMETHING</h1>
        <Link to="app">
          <button>Sign Up!</button>
        </Link>
      </div>
    );
  }
});
