'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {editedPost: this.props.postData};
  },

  handleChange: function(event) {
    var post = this.state.editedPost;
    post.body = event.target.value;
    this.setState({editedPost: post});
  },

  handleDelete: function(event) {
    var editedPost = this.state.editedPost;

    PostActions.deletePost(editedPost);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var editedPost = this.state.editedPost;

    PostActions.editPost(editedPost);
    this.setState(editedPost);
    this.props.showEdit();
  },

  render: function() {
    return (
      <form name="edit-post" method="PUT" className="edit-post-form"
        onSubmit={this.handleSubmit}>
        <input name="edit-post" type="text"
          value={this.state.editedPost.body} onChange={this.handleChange}/>
        <input name="edit-post" type="submit" value="Save Changes"/>
        <input name="edit-post" type="button"
          onClick={this.handleDelete} value="Delete"/>
      </form>
    );
  }
});
