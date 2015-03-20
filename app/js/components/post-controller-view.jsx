var React = require('react');
var PostList = require('./post-list.jsx');
var Footer = require('./footer.jsx');
var PostStore = require('../stores/post-store');
var PostActions = require('../actions/post-actions');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');
var Cookies = require('cookies-js');

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
    var token = Cookies.get('eat');
    PostStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    PostActions.getPosts();
    console.log('token in componentDidMount',token);
    if(token) {
      console.log('fire in mount', token)
      UserActions.getSignedIn(token);
    }
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange)
    UserStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    var state = getState();
    var storeSession = UserStore.getSession()
    return (
      <div>
        <header></header>
        <main>
          <PostList postData={this.state.postData} sessionData={this.state.session}/>
        </main>
        <Footer sessionData={this.state.session}/>
      </div>
    )
  }
});
