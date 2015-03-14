var React = require('react');
var PostActions = require('../actions/post-actions')
var request = require('superagent');

module.exports = React.createClass({
  getInitialState: function(){
    return {createdPost:{body: '', user: 'dude'}}
  },
  handleChange: function(event) {
    var post = this.state.createdPost;
    post.body = event.target.value;
    this.setState({createdPost: post});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var createdPost = this.state.createdPost;
    var url = this.props.url + '/';

    request
      .post(url)
      .send(createdPost)
      .end(function(err, res){
        if (err) return console.log(err);
        PostActions.createPost(res.body);
        var state = this.state;
        state.createdPost.body = '';
        this.setState(state);
      }.bind(this))

  },
  render: function() {
    return (
      <form name="create-post" method="POST" onSubmit={this.handleSubmit}>
        <input name="create-post" value={this.state.createdPost.body}
        onChange={this.handleChange} type="text"/>
        <input name="create-post" type="submit" value="Create Post"/>
      </form>
    );
  }
});