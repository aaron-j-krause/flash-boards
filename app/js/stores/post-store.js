var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var request = require('superagent')

var postData = [];

var PostStore = _.assign({}, EventEmitter.prototype, {
  getPosts: function(){
    return postData;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  }
});

//handles promises sent from actions

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var actionType = payload.action.actionType;
  var promise = payload.action.promise;

  var handlers = {
    POST_CREATE: function() {
      return promise.then(function(res) {
        postData.push(res.body);
      });
    },
    POST_EDIT: function(){
      return promise.then(function(res) {
        var index = postData.indexOf(res.body);
        postData[index] = res.body;
      });
    },
    POST_DELETE: function(){
      return promise.then(function(res){
        var index = -1;
        postData.forEach(function(p, i) {
          if(p._id === res.body._id) index =  i
        });
        postData.splice(index, 1);
      });
    },
    POST_GET_ALL: function(){
      return promise.then(function(res){
        postData = res.body;
      });
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]().then(function(){
    PostStore.emitChange();
  });

  return true;

});

module.exports = PostStore;
