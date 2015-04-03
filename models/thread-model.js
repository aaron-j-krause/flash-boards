'use strict';

var mongoose = require('mongoose');

var threadSchema = mongoose.Schema({
  author: String,
  authorId: mongoose.Schema.Types.ObjectId,
  users: [String],
  subject: String
});

module.exports = mongoose.model('Thread', threadSchema);
