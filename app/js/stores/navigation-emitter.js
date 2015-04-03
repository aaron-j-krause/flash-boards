'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

module.exports = assign({}, EventEmitter.prototype, {
  emitNav: function() {
    this.emit('navigate');
  },

  addNavListener: function(callback) {
    this.on('navigate', callback);
  },

  removeNavListener: function(callback) {
    this.removeListener('navigate', callback);
  }
});
