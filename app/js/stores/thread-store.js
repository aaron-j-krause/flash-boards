'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var UserActions = require('../actions/user-actions');
var NavEmitter = require('./navigation-emitter');

var currentThread;
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
        console.log(res.body);
        currentThread = res.body;
      })
    },

    'THREAD_GET_BY_USER': function() {
      return promise.then(function(res) {
        userThreads = res.body;
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
