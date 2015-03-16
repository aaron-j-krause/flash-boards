var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/userSchema');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) {

    User.findOne({'basic.email': email}, function(err, user) {

      if (err) return done('could not authenticate1');

      if (!user) return done('could not authenticate2');
      console.log(user.basic);
      if (!user.validPassword(password)) return done('could not authenticate3');
      return done(null, user);
    });
  }));
};
