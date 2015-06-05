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
      <header className="main-header">
        <ul className="nav-list">
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="thread">Thread</Link>
          </li>
          <li>
            <a href="#" onClick={this.handleClick}>Sign Out</a>
          </li>
        </ul>
        <p>Signed in as {this.props.sessionData.name}</p>
      </header>
    );
  }
})