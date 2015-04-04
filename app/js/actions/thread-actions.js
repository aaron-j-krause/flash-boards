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
  }
}
