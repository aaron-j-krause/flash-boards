var uniqueValidator = require('mongoose-unique-validator');

module.exports = exports = {};

var mongoose = require('mongoose');
var eat = require('eat');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  basic:{
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(appSecret, callback) {
  return eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback);
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
