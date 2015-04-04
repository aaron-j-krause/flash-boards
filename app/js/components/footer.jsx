'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');
var CreatePostForm = require('./create-post-form.jsx');
var CreateThreadForm = require('./create-thread-form.jsx');
var Cookies = require('cookies-js');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var session = this.props.sessionData;
    var path = this.context.router.getCurrentPathname();
    var form = path === '/thread' ? <CreatePostForm sessionData={session}/> :
      <CreateThreadForm sessionData={session}/>;

    return (
      <footer>
        {form}
      </footer>
    );
  }
});
