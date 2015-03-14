var React = require('react');
var PostActions = require('../actions/post-actions');
var request = require('superagent');

module.exports = React.createClass({
  getInitialState: function() {
    return {editedPost: this.props.data};
  },

  handleChange: function(event) {
    var post = this.state.editedPost;
    post.body = event.target.value;
    this.setState({editedPost: post});
  },

  handleDelete: function(event) {
    var _id = this.state.editedPost._id;
    var url = this.props.url + '/' + _id;

    request
      .del(url)
      .end(function(err, res){
        if (err) return console.log(err);
        PostActions.deletePost(res.body);
      });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var editedPost = this.state.editedPost;

    request
      .put(this.props.url + '/')
      .send(editedPost)
      .end(function(err, res){
        if (err) return console.log(err);
        PostActions.editPost(res.body);
        this.setState({editedPost: res.body});
        this.props.showEdit();
      }.bind(this))
  },

  render: function() {
    return (
      <form name="edit-post" method="PUT" onSubmit={this.handleSubmit}>
        <input name="edit-post" type="text"
          value={this.state.editedPost.body} onChange={this.handleChange}/>
        <input name="edit-post" type="submit" value="Save Changes"/>
        <input name="edit-post" type="button"
          onClick={this.handleDelete} value="Delete"/>
      </form>
    );
  }
});
