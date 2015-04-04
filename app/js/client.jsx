'use strict';

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var PostControllerView = require('./components/post-controller-view.jsx');
var SignIn = require('./components/signin.jsx');
var SignUp = require('./components/signup.jsx');
var Welcome = require('./components/welcome.jsx');
var Main = require('./components/main.jsx');
var PostList = require('./components/post-list.jsx');

var routes = (
  <Route name="main" path="/" handler={Main}>
    <DefaultRoute handler={Welcome} />
    <Route name="app" path="/home" handler={PostControllerView}>
      <Route name="thread" path="/thread" handler={PostList}/>
    </Route>
    <Route name="signin" path="/sign-in" handler={SignIn} />
    <Route name="signup" path="/sign-up" handler={SignUp} />
  </Route>
);

Router.run(routes, function(Handler, state) { 
  React.render(<Handler params={state.params}/>, document.body)
})
