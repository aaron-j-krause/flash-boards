'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var UserActions = require('../actions/user-actions');
var NavEmitter = require('./navigation-emitter');
var PostStore = require('./post-store')

var currentThread = [];
var userThreads = [];
var taggedThreads = [];
var currentSubject = '';

var ThreadStore = assign({}, EventEmitter.prototype, {
  getCurrentThread: function() {
    return currentThread;
  },

  getUserThreads: function() {
    return userThreads;
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
    'THREAD_CREATE': function() {
      return promise.then(function(res) {
        userThreads.push({
          _id: res.body._id,
          subject: res.body.subject
        })
        currentThread = res.body;
        NavEmitter.emitChange();
      })
    },

    'THREAD_GET_BY_USER': function() {
      return promise.then(function(res) {
        userThreads = res.body;
      });
    },

    'THREAD_GET_BY_ID': function() {
      return promise.then(function(res) {
        currentThread = res.body;
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
    }
  }

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function(){
    ThreadStore.emitChange()
  });

  return true;
});

module.exports = ThreadStore;
