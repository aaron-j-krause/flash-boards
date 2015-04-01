'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');
var Cookies = require('cookies-js');
var Link = require('react-router').Link;

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      email: '',
      password: ''
    }
  },
  handleChange: function(event){
    var field = event.target.placeholder;
    var state = this.state;
    state[field] = event.target.value;
    this.setState(state);
  },
  handleSubmit: function(event){
    event.preventDefault();
    var user = this.state;
    UserActions.signIn(user);
    this.setState({email: '', password: ''});
    setTimeout(function(){
      this.context.router.transitionTo('/home');
    }.bind(this), 1000);

  },
  render: function() {
    return (
      <form name="sign-in" onSubmit={this.handleSubmit}>
        <input type="text" name="sign-in" onChange={this.handleChange}
          value={this.state.email} placeholder="email" />
        <input type="text" name="sign-in" onChange={this.handleChange}
          value={this.state.password} placeholder="password" />
        <input type="submit" name="sign-in" />
      </form>
    );
  }
});
