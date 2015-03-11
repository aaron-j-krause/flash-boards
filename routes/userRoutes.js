var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

module.exports = function(router) {
  //on base route /user
  router.get('/', function(req, res) {
    var list = [];
    User.find({}, 'name', function(err, users) {
      res.json(users);
    });
  });

  router.post('/', function(req, res) {
    var newUser = new User({name: req.body.name});

    newUser.basic.email = req.body.email;
    newUser.basic.password = req.body.password;

    newUser.save(function(err, user) {
      if (err) return res.status(500).send({msg: 'could not create user'});

      res.json({_id: user._id, email: user.basic.email, name: user.name});
    });
  });
};
