'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var UserActions = require('../actions/user-actions');
var NavEmitter = require('./navigation-emitter');

var currentThread = [];
var userThreads = [];

var ThreadStore = assign({}, EventEmitter.prototype, {
  getCurrentThread: function() {
    return currentThread;
  },

  getUserThreads: function() {
    return userThreads;
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

AppDispatcher.register(function(payload) {
  var promise = payload.action.promise;
  var actionType = payload.action.actionType;

  var handlers = {
    'THREAD_CREATE': function() {
      return promise.then(function(res) {
        currentThread = res.body;
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
      console.log('THREAD UPDATE')
      return promise.then(function(res) {
        currentThread.push(res);
      })
    }
  }

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function(){
    console.log('THREAD CHANGE');
    ThreadStore.emitChange()
  });

  return true;
});

module.exports = ThreadStore;
