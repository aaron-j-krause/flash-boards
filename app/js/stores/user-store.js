var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var userData = [];

var UserStore = assign({}, EventEmitter.prototype, {
  getUsers: function(){
    return userData;
  },
  emitChange: function(){
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
      })
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function(){
    UserStore.emitChange();
  });

  return true;
});
