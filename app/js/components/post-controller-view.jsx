var React = require('react');
var CreatePostForm = require('./create-post-form.jsx');
var PostList = require('./post-list.jsx');
var Footer = require('./footer.jsx');
var PostStore = require('../stores/post-store');
var PostActions = require('../actions/post-actions');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

function getState(){
  return {
    postData: PostStore.getPosts(),
    session: UserStore.getSession()
  };
};

module.exports = React.createClass({
  getInitialState: function(){
    return getState();
  },

  componentDidMount: function(){
    PostStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    PostActions.getPosts();
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange)
    UserStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    return (
      <div>
        <header></header>
        <main>
          <PostList data={this.state.postData} sessionData={this.state.session}/>
        </main>
        <Footer sessionData={this.state.session}/>
      </div>
    )
  }
});
