var React = require('react');
var PostActions = require('../actions/post-actions')
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function(){
    return {createPost:{body: '', user: 'dude'}}
  },
  handleChange: function(event) {
    var post = this.state.createPost;
    post.body = event.target.value;
    this.setState({createPost: post});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var createPost = this.state.createPost;
    $.ajax({
      type: "POST",
      url: this.props.url + '/',
      data: JSON.stringify(createPost),
      contentType: 'application/json',
      success: function(data) {
        PostActions.createPost(data);
        var state = this.state;
        state.createPost.body = '';
        this.setState(state);
      }.bind(this)
    });

  },
  render: function() {
    return (
      <form name="create-post" method="POST" onSubmit={this.handleSubmit}>
        <input name="create-post" value={this.state.createPost.body}
        onChange={this.handleChange} type="text"/>
        <input name="create-post" type="submit" value="Create Post"/>
      </form>
    );
  }
});