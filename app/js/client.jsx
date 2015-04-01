var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var PostControllerView = require('./components/post-controller-view.jsx');


var routes = (
  <Route name="app" path="/" handler={PostControllerView}>
  </Route>
);

Router.run(routes, function(Handler, state) { 
  React.render(<Handler params={state.params}/>, document.body)
})
