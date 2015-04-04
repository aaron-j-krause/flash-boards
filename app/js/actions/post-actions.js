'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var PostAPI = require('../api/post-api.js');

//API calls return a promise which is dispatched from
//here to be dealt with in the post-store

module.exports = {
  createPost: function(post) {
    var promise = PostAPI.createNewPost(post);
    AppDispatcher.handleAction({
      actionType: 'POST_CREATE',
      promise: promise
    });
  },

  editPost: function(post) {
    var promise = PostAPI.updatePost(post);
    AppDispatcher.handleAction({
      actionType: 'POST_EDIT',
      promise: promise
    });
  },

  deletePost: function(post) {
    var promise = PostAPI.deletePost(post);
    AppDispatcher.handleAction({
      actionType: 'POST_DELETE',
      promise: promise
    });
  },

  getPosts: function(id) {
    var promise = PostAPI.getPostsByThreadId(id);
    AppDispatcher.handleAction({
      actionType: 'POST_GET_ALL',
      promise: promise
    });
  }
};
