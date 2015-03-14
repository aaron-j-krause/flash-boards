var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var $ = require('jquery');

var postData = [];

$.getJSON('/posts/', function(data){
  postData = data;
})

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

AppDispatcher.register(function(payload) {
  console.log('IN STORE dispatcher', payload);
  var action = payload.action;
  var text;

  if (action.actionType == 'POST_CREATE') {
  } else if (action.actionType == 'POSTS_SET') {
    console.log('POSTS_SET');
    $.getJSON('/posts/', function(data){
      postData = data;
    });
  } else {
    return true;
  }
  PostStore.emitChange();

  return true;

});

module.exports = PostStore;
