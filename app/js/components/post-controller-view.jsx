var React = require('react');
var PostStore = require('../stores/post-store');
var CreatePostForm = require('./create-post-form.jsx');
var PostList = require('./post-list.jsx');
var PostActions = require('../actions/post-actions');
var UserActions = require('../actions/user-actions');

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
    PostActions.getPosts();
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
        <header></header>
        <main>
          <PostList data={this.state.postData} url={this.props.postsBaseUrl} />
        </main>
        <footer>
          <CreatePostForm url={this.props.postsBaseUrl} />
        </footer>
      </div>
    )
  }
});
