var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var userData = [];

var session = {loggedIn: false}

var UserStore = assign({}, EventEmitter.prototype, {
  getUsers: function() {
    return userData;
  },
  getSession: function() {
    return session;
  },
  emitChange: function() {
    this.emit('userchange');
  },
  addChangeListener: function(callback) {
    this.on('userchange', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('userchange', callback);
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
        session = {
          loggedIn: true,
          name: res.body.name,
          token: res.body.token
        }
      },
      function(err){
        console.log(err);
        session = {
          loggedIn: false,
          error: 'Incorrect login information'
        };
      })
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function() {
    UserStore.emitChange();
  });

  return true;
});

module.exports = UserStore;

