'use strict';
var NavEmitter = require('./navigation-emitter');
var UserStore = require('./user-store');

module.exports = (function(){
  return function(payload) {
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
        NavEmitter.emitChange();
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
}
}());
console.log('THIS IS IT LOADING TGHE MODUKELE', module.exports, typeof module.exports)
