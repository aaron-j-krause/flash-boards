var React = require('react');
var PostStore = require('../stores/post-store');
var CreatePostForm = require('./create-post-form');
var PostList = require('./post-list');
var $ = require('jquery');
var PostActions = require('../actions/post-actions');

postData = [];

function getPostState(){
  return {
    postData: PostStore.getPosts()
  };
};

module.exports = React.createClass({
  getInitialState: function(){
    return getPostState();
  },
  componentWillMount: function(){
    PostActions.setPosts()
  },
  componentDidMount: function(){

    PostStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange)
  },
  _onChange: function() {
    this.setState(getPostState());
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
