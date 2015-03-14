var AppDispatcher = require('../dispatcher/app-dispatcher');
var $ = require('jquery').ajax;

var PostActions = {
  createPost: function(post){
    console.log('IN ACTIONS', post);
    AppDispatcher.handleAction({
      actionType: 'POST_CREATE',
      data: post
    });
  },
  setPosts: function(posts){
    AppDispatcher.handleAction({
      actionType: 'POSTS_SET',
      data: posts
    })
  }
};

module.exports = PostActions;
