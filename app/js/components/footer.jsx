'use strict';

var React = require('react');
var SignInForm = require('./signin-form.jsx');
var CreatePostForm = require('./create-post-form.jsx');
var Cookies = require('cookies-js');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var session = this.props.sessionData;
    var path = this.context.router.getCurrentPathname();
    var form = path === '/thread' ? <CreatePostForm sessionData={session}/> : '';
    console.log(this.context.router.getCurrentPathname())
    return (
      <footer>
        {form}
      </footer>
    );
  }
});
