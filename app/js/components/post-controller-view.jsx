'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var PostList = require('./post-list.jsx');
var Footer = require('./footer.jsx');
var Header = require('./header.jsx');
var PostStore = require('../stores/post-store');
var PostActions = require('../actions/post-actions');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');
var ThreadStore = require('../stores/thread-store');
var ThreadActions = require('../actions/thread-actions');
var Cookies = require('cookies-js');

function getState(){
  return {
    postData: ThreadStore.getCurrentThread(),
    session: UserStore.getSession(),
    threadData: ThreadStore.getUserThreads()
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
    PostActions.getPosts();
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
    var threadId = this.state.postData.thread ? this.state.postData.thread._id : '';
    console.log(this.state.postData,'HAS POSOSOST??')
    if (!storeSession.loggedIn) this.context.router.transitionTo('/sign-in');

    return (
      <div>
        <Header sessionData={this.state.session}/>
        <main>
          <RouteHandler params={this.props.params} postData={this.state.postData}
            sessionData={this.state.session} threadData={this.state.threadData}/>
        </main>
        <Footer threadId={threadId} sessionData={this.state.session}/>
      </div>
    )
  }
});
