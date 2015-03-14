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
  editPost: function(post){
    AppDispatcher.handleAction({
      actionType: 'POST_EDIT',
      data: post
    })
  },
  deletePost: function(post){
    AppDispatcher.handleAction({
      actionType: 'POST_DELETE',
      data: post
    })
  }
};

module.exports = PostActions;
