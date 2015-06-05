'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');
var UserStore = require('../stores/user-store');

var Link = require('react-router').Link;

function getUserData(){
  return {
    session: UserStore.getSession()
  }
}

//linked to by welcome
module.exports = React.createClass({
  getInitialState: function() {
    return getUserData();
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._change);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._change);
  },

  _change: function(){
    this.setState(getUserData())
  },

  render: function() {
    var error = '';
    if (this.state.session.error) error = this.state.session.error;

    return (
      <main className='welcome'>
        <h1>SIGN IN</h1>
        <SignInForm />
        <span>{error}</span>
      </main>
    );
  }
});
