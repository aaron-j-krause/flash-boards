var React = require('react');

//Components
var EditPostForm = require('./components/edit-post-form');
var Post = require('./components/post');
var PostList = require('./components/post-list');
var CreatePostForm = require('./components/create-post-form')
var PostControllerView = require('./components/post-controller-view');

React.render(<PostControllerView postsBaseUrl={'/posts'}/>, document.body)
