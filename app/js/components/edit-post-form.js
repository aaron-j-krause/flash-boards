var React = require('react');
var PostActions = require('../actions/post-actions');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {editPost: this.props.data};
  },
  handleChange: function(event) {
    var post = this.state.editPost;
    post.body = event.target.value;
    this.setState({
      editPost: post
    });
  },
  handleDelete: function(event) {
    var _id = this.state.editPost._id;
    $.ajax({
      type: "DELETE",
      url: this.props.url + '/' + _id,
      contentType: 'application/json',
      success: function(data) {
        PostActions.deletePost(data);
      }.bind(this)
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var editPost = this.state.editPost;
    $.ajax({
      type: "PUT",
      url: this.props.url + '/',
      data: JSON.stringify(editPost),
      contentType: 'application/json',
      success: function(data) {
        PostActions.editPost(data);
        this.setState({editPost: data});
        this.props.showEdit();
      }.bind(this)
    });

  },
  render: function() {
    return (
      <form name="edit-post" method="PUT" onSubmit={this.handleSubmit}>
        <input name="edit-post" type="text"
          value={this.state.editPost.body} onChange={this.handleChange}/>
        <input name="edit-post" type="submit" value="Save Changes"/>
        <input name="edit-post" type="button"
          onClick={this.handleDelete} value="Delete"/>
      </form>
    );
  }
});
