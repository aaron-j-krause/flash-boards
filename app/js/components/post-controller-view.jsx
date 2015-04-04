'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var PostList = require('./post-list.jsx');
var Footer = require('./footer.jsx');
var Header = require('./header.jsx');
var PostStore = require('../stores/post-store');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');
var ThreadStore = require('../stores/thread-store');
var ThreadActions = require('../actions/thread-actions');
var Cookies = require('cookies-js');

function getState(){
  return {
    postData: PostStore.getPosts(),
    session: UserStore.getSession(),
    threadList: ThreadStore.getUserThreads(),
    threadSubject: ThreadStore.getCurrentSubject(),
    currentThread: ThreadStore.getCurrentThread()
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
    ThreadStore.addChangeListener(this._onChange);
    ThreadActions.getThreadsByUser();
    if(token) {
      UserActions.getSignedIn(token);
    }
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    var state = getState();
    var storeSession = UserStore.getSession();
    var threadId = this.state.currentThread._id || '';
    if (!storeSession.loggedIn) this.context.router.transitionTo('/sign-in');
    //routes to profile-page and post-list
    return (
      <div>
        <Header sessionData={this.state.session}/>
        <main>
          <RouteHandler params={this.props.params} postData={this.state.postData}
            sessionData={this.state.session} threadData={this.state.threadList}
            threadSubject={this.state.threadSubject}/>
        </main>
        <Footer threadId={threadId} sessionData={this.state.session}/>
      </div>
    )
  }
});
