'use strict';

var React = require('react');
var Link = require('react-router').Link;
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    UserActions.signOut();
  },

  render: function() {
    return (
      <header>
        <Link to="profile">Profile</Link>
        <Link to="thread">Thread</Link>
        <a href="#" onClick={this.handleClick}>Sign Out</a>
        <p>Signed in as {this.props.sessionData.name}</p>
      </header>
    );
  }
})