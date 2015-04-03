'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');
var UserStore = require('../stores/user-store');

var Link = require('react-router').Link;

//linked to by welcome
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
