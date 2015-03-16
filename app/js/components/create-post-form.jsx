var React = require('react');
var PostActions = require('../actions/post-actions')
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
  render: function() {
    console.log(this.props.sessionData, this.state.sessionData);
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
