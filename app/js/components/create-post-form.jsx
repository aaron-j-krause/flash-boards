'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');
var UserActions = require('../actions/user-actions');
var request = require('superagent');

module.exports = React.createClass({
  getInitialState: function(){
    return {createdPost:{body: '', user: this.props.sessionData.name}}
  },
  handleChange: function(event) {
    var post = this.state.createdPost;
    post.body = event.target.value;
    this.setState({createdPost: post});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var createdPost = this.state.createdPost;
    createdPost.user = this.props.sessionData.name
    var url = this.props.url + '/';
    PostActions.createPost(createdPost);

    var state = this.state;
    state.createdPost.body = '';
    this.setState(state);

  },
  signOut: function(event) {
    event.preventDefault();
    UserActions.signOut(this.props.sessionData.name);
  },
  render: function() {
    return (
      <form name="create-post" method="POST" className="create-post-form"
        onSubmit={this.handleSubmit}>
        <textarea name="create-post" value={this.state.createdPost.body}
        onChange={this.handleChange}></textarea>
        <input name="create-post" type="submit" value="Create Post"/>
        <button name="log-out" onClick={this.signOut} >Sign Out</button>
      </form>
    );
  }
});
