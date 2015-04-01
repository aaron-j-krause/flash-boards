'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');

var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div className='welcome'>
        <h1>SIGN IN</h1>
        <SignInForm />
      </div>
    );
  }
});
