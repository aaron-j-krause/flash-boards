module.exports = exports = {};

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  basic:{
    email: {type: String, required: true},
    password: {type: String, required: true}
  },
  name: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
