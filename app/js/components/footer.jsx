var React = require('react');
var SignInForm = require('./signin-form.jsx');
var CreatePostForm = require('./create-post-form.jsx');
var Cookies = require('cookies-js');

module.exports = React.createClass({
  render: function() {
    console.log('cookie crisp', Cookies.get('eat'), 'sssseeeesssion', this.props.sessionData);
    var session = this.props.sessionData;
    var form = session.loggedIn ? <CreatePostForm sessionData={session}/> : <SignInForm/>;
    var error = session.error ? <span>{session.error}</span> : '';
    return (
      <footer>
        {form}
        {error}
      </footer>
    );
  }
});
