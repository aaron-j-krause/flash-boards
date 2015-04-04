'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');

module.exports = React.createClass({
  getInitialState: function(){
    return {createdPost:{body: ''}}
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
    PostActions.createPost(createdPost);

    this.setState({createdPost: {body: ''}});
  },

  render: function() {
    return (
      <form name="create-post" method="POST" className="create-post-form"
        onSubmit={this.handleSubmit}>
        <textarea name="create-post" value={this.state.createdPost.body}
        onChange={this.handleChange}></textarea>
        <input name="create-post" type="submit" value="Create Post"/>
      </form>
    );
  }
});
