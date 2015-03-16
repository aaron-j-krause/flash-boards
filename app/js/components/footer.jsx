var React = require('react');
var SignInForm = require('./signin-form.jsx');
var CreatePostForm = require('./create-post-form.jsx');

module.exports = React.createClass({
  render: function() {
    var session = this.props.sessionData
    console.log('FOOTER',session);
    var form = session.loggedIn ? <CreatePostForm sessionData={session}/> : <SignInForm/>;
    var error = session.error ? <span>{session.error}</span> : '';
    return (
      <footer>
        {form}
        {error}
      </footer>
    );
  }
})