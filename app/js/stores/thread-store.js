'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var UserActions = require('../actions/user-actions');
var NavEmitter = require('./navigation-emitter');
var UserStore = require('./user-store');

var currentThread = [];
var userThreads = [];
var taggedThreads = [];
var currentSubject = '';
var postData = [];

var ThreadStore = assign({}, EventEmitter.prototype, {
  getPosts: function() {
    return postData;
  },

  getCurrentThread: function() {
    return currentThread;
  },

  getUserThreads: function() {
    return userThreads;
  },

  getTaggedThreads: function() {
    return taggedThreads;
  },

  getCurrentSubject: function() {
    return currentSubject;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

ThreadStore.dispatchToken = AppDispatcher.register(function(payload) {
  var promise = payload.action.promise;
  var actionType = payload.action.actionType;

  var handlers = {

//Thread handlers
    'THREAD_CREATE': function() {
      return promise.then(function(res) {
        userThreads.push({
          _id: res.body._id,
          subject: res.body.subject
        })
        currentThread = res.body;
        postData = [];
        NavEmitter.emitChange();
      })
    },

    'THREAD_GET_BY_USER': function() {
      AppDispatcher.waitFor([UserStore.dispatchToken]);
      return promise.then(function(res) {
        userThreads = res.body;
      });
    },

    'THREAD_GET_BY_TAG': function() {
      return promise.then(function(res) {
        taggedThreads = res.body;
      })
    },

    'THREAD_GET_BY_ID': function() {
      return promise.then(function(res) {
        currentThread = res.body.thread;
      });
    },

    'THREAD_UPDATE_LOCAL': function() {
      return promise.then(function(res) {
        currentThread.posts.push(res);
      })
    },

    'THREAD_SET_CURRENT_SUBJECT': function() {
      return promise.then(function(res) {
        currentSubject = res;
        NavEmitter.emitChange();
      })
    },

//Post handlers
    POST_CREATE: function() {
      return promise.then(function(res) {
        postData.push(res.body);
      });
    },

    POST_EDIT: function() {
      return promise.then(function(res) {
        var index = postData.indexOf(res.body);
        postData[index] = res.body;
      });
    },

    POST_DELETE: function() {
      return promise.then(function(res) {
        var index = -1;
        postData.forEach(function(p, i) {
          if (p._id === res.body._id) index =  i;
        });
        postData.splice(index, 1);
      });
    },

    POST_GET_ALL: function() {
      return promise.then(function(res) {
        postData = res.body;
      });
    }
  }
  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function(){
    ThreadStore.emitChange()
  });

  return true;
});

module.exports = ThreadStore;
