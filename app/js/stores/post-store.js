var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var $ = require('jquery');

var postData = [];

$.getJSON('/posts/', function(data){
  postData = data;
  PostStore.emitChange();
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
  var actionType = payload.action.actionType;
  var data = payload.action.data;

  var handlers = {
    POST_CREATE: function(){
      postData.push(data);
    },
    POST_EDIT: function(){
      console.log('EDDDITT handler')
      var index = postData.indexOf(data);
      postData[index] = data;
    },
    POST_DELETE: function(){
      console.log('DELETE HANDLEER')
      var index = -1;
      postData.forEach(function(p, i) {
        if(p._id === data._id) index =  i
      });
      postData.splice(index, 1);
    }
  }

  if (!handlers[actionType]) return true;

  handlers[actionType]();
  PostStore.emitChange();

  return true;

});

module.exports = PostStore;
