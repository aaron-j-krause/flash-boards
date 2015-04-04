'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var ThreadAPI = require('../api/thread-api');

//API calls return a promise which is dispatched from
//here to be dealt with in the thread-store

module.exports = {
  createThread: function(thread) {
    var promise = ThreadAPI.createNewThread(thread);
    AppDispatcher.handleAction({
      actionType: 'THREAD_CREATE',
      promise: promise
    });
  },

  getThreadsByUser: function(user) {
    var promise = ThreadAPI.getThreadsByUser(user);
    AppDispatcher.handleAction({
      actionType: 'THREAD_GET_BY_USER',
      promise: promise
    });
  },

  getThreadsByTag: function(user) {
    var promise = ThreadAPI.getThreadsByTag(user);
    AppDispatcher.handleAction({
      actionType: 'THREAD_GET_BY_TAG',
      promise: promise
    })
  },

  getThreadById: function(id) {
    var promise = ThreadAPI.getThreadById(id);
    AppDispatcher.handleAction({
      actionType: 'THREAD_GET_BY_ID',
      promise: promise
    });
  },

  updateLocalThread: function(post) {
    var promise = ThreadAPI.updateLocal(post);
    AppDispatcher.handleAction({
      actionType: 'THREAD_UPDATE_LOCAL',
      promise: promise
    });
  },

  setCurrentSubject: function(subject) {
    var promise = ThreadAPI.setSubject(subject);
    AppDispatcher.handleAction({
      actionType: 'THREAD_SET_CURRENT_SUBJECT',
      promise: promise
    })
  }
};
