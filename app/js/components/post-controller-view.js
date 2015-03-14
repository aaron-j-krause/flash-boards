var React = require('react');
var PostStore = require('../stores/post-store');
var CreatePostForm = require('./create-post-form');
var PostList = require('./post-list');
var PostActions = require('../actions/post-actions');

function getPostState(){
  return {
    postData: PostStore.getPosts()
  };
};

module.exports = React.createClass({
  getInitialState: function(){
    return getPostState();
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

  render: function() {

    return (
      <div>
        <PostList data={this.state.postData} url={this.props.postsBaseUrl} />
        <CreatePostForm url={this.props.postsBaseUrl} />
      </div>
    )
  }
});
