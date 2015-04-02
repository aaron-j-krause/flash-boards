var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var eat = require('eat');

module.exports = function(router, passport, appSecret) {
  //on base route /user
  router.get('/', function(req, res) {
    var list = [];
    User.find({}, 'name', function(err, users) {
      res.json(users);
    });
  });

  router.get('/signin', passport.authenticate('basic', {session: false}),
    function(req, res) {
      req.user.generateToken(appSecret, function(err, token) {
        if (err) res.status(500).send({'msg':'could not generate token'});
        res.json({token: token, name: req.user.name});
      });
    });

  router.get('/signed-in', function(req, res) {
    eat.decode(req.headers.token, appSecret, function(err, token) {
      if (err) return res.status(500).send({'msg': 'decode problem'});
      User.findById(token.id, function(err, user) {
        if (err) return res.status(500).send({'msg': 'could not find user'});
        res.json({name: user.name});
      });
    });
  });

  router.post('/', function(req, res) {
    var newUser = new User({name: req.body.name});

    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password);

    newUser.save(function(err, user) {
      console.log(err);
      if (err) return res.status(500).send({msg: 'could not create user'});

      user.generateToken(appSecret, function(err, token) {
        if (err) res.status(500).send({'msg':'could not generate token'});

        res.json(token);
      });
    });
  });
};
