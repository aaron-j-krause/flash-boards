var React = require('react');

var PostControllerView = require('./components/post-controller-view');

React.render(<PostControllerView postsBaseUrl={'/posts'}/>, document.body)
