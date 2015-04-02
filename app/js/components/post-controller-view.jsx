'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

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
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return getState();
  },

  componentDidMount: function(){
    var token = Cookies.get('eat');
    PostStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    PostActions.getPosts();
    if(token) {
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
    var storeSession = UserStore.getSession();
    if (!storeSession.loggedIn) this.context.router.transitionTo('/sign-in');

    return (
      <div>
        <header></header>
        <main>
          <PostList postData={this.state.postData} sessionData={this.state.session}/>
          <RouteHandler params={this.props.params}/>
        </main>
        <Footer sessionData={this.state.session}/>
      </div>
    )
  }
});
