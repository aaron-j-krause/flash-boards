var AppDispatcher = require('../dispatcher/app-dispatcher');
var api = require('../api/post-api.js');

var PostActions = {
  createPost: function(post){
    var promise = api.createNewPost(post);
    console.log('post_create')
    AppDispatcher.handleAction({
      actionType: 'POST_CREATE',
      data: promise
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
  },
  getPosts: function() {
    var promise = api.getAllPosts();
    AppDispatcher.handleAction({
      actionType: 'POST_GET_ALL',
      data: promise
    })
  }
};

module.exports = PostActions;
