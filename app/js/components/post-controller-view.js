var React = require('react');
var CreatePostForm = require('./create-post-form');
var PostList = require('./post-list');
var $ = require('jquery');
postData = [];

module.exports = React.createClass({
  getInitialState: function(){
    return({postData: postData})
  },
  componentDidMount: function(){
    $.getJSON('/posts/', function(data){
      this.setState({postData: data});
    }.bind(this));  
  },
  onCreatePost: function(post){
    var state = this.state;
    state.postData.push(post);
    this.setState(state);
  },
  onEditPost: function(post){
    var state = this.state;
    var index = state.postData.indexOf(post);
    state[index] = post;
    this.setState(state);
  },
  onDeletePost: function(post) {
    var state = this.state;
    var index = -1;
    state.postData.forEach(function(p, i) {
      if(p._id === post._id) index =  i
    });
    state.postData.splice(index, 1);
    this.setState(state);
  },
  render: function() {
    var postHandlers = {
      edit: this.onEditPost,
      create: this.onCreatePost,
      del: this.onDeletePost
    };

    return (
      <div>
        <PostList data={this.state.postData} url={this.props.postsBaseUrl} 
          handlers={postHandlers} />
        <CreatePostForm onCreatePostSubmit={this.onCreatePost} url={this.props.postsBaseUrl} />
      </div>
    )
  }
});
