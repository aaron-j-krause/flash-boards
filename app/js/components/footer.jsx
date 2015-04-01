'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');
var CreatePostForm = require('./create-post-form.jsx');
var Cookies = require('cookies-js');

module.exports = React.createClass({
  render: function() {
    var session = this.props.sessionData;
    return (
      <footer>
        <CreatePostForm sessionData={session}/>
      </footer>
    );
  }
});
