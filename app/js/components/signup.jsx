'use strict';

var React = require('react');

var Link = require('react-router').Link;
//linked to by welcome
module.exports = React.createClass({
  render: function() {
    return (
      <div className='sign-up'>
        <h1>SIGN UP OR SOMETHING</h1>
        <Link to="app">
          <button>Sign Up!</button>
        </Link>
      </div>
    );
  }
});
