'use strict';

var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
  render: function() {
    return (
      <main>
        <div className='welcome'>
          <h1>Welcome to flash boards!</h1>
          <Link to="signin">Sign In</Link>
          <Link to="signup">Sign Up</Link>
        </div>
      </main>
    );
  }
});
