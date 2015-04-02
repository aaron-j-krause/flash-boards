'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var isPromise = require('is-promise');
var assign = require('object-assign');
var Cookies = require('cookies-js');
var UserActions = require('../actions/user-actions');

var userData = [];

var session = {loggedIn: false};

function resetSession() {
  session = {loggedIn: false};
}

var UserStore = assign({}, EventEmitter.prototype, {
  getUsers: function() {
    return userData;
  },
  getSession: function() {
    console.log('get session', session);
    return session;
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
  var actionType = payload.action.action;

  var handlers = {
    USER_GET_ALL: function() {
      return promise.then(function(res) {
        console.log(res.body);
      });
    },
    USER_SIGN_IN: function() {
      return promise.then(function(res) {
        Cookies.set('eat', res.body.token);
        session = {
          loggedIn: true
        };
      },
      function(err) {
        console.log(err);
        session = {
          loggedIn: false,
          error: 'Incorrect login information'
        };
      });
    },
    USER_SIGN_OUT: function() {
      return promise.then(function() {
        resetSession();
        Cookies.set('eat', '');
      });
    },
    USER_GET_SIGNED_IN: function() {
      return promise.then(function(res) {
        session = {
          loggedIn: true,
          name: res.body.name
        };
      }, function(err) {
        session = {
          loggedIn: false
        };
      });
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function() {
    UserStore.emitChange();
  });

  return true;
});

module.exports = UserStore;

