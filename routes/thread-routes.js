'use strict';

var Post = require('../models/post-model');
var Thread = require('../models/thread-model');
var eatAuth = require('../lib/eat-auth');

module.exports = function(router, appSecret) {
  router.post('/', function(req, res) {
    var newThread = new Thread({
      author: req.body.author,
      subject: req.body.subject
    });

    newThread.save(function(err, thread) {
      if (err) return res.status(500).send({msg: 'could not save thread'});
      res.send(thread);
    });
  });

  router.delete('/:id', function(req, res) {
    Thread.findOneAndRemove({_id: req.params.id}, function(err, thread) {
      if (err) return res.status(500).send({msg: 'could not delete thread'});
      res.send(thread);
    });
  });

  router.put('/tags', function(req, res) {
    Thread.findOneAndUpdate({_id: req.body.id},
      {$push: {users: {$each: req.body.users}}}, function(err, thread) {
      if (err) return res.status(500).send({msg: 'could not add tags'});
      res.send(thread);
    });
  });

  router.get('/titles/', eatAuth(appSecret), function(req, res) {
    var token = req.headers.token;
    Thread.find({author: req.user.name}, 'subject', function(err, titles){
      if (err) return res.status(500).send({msg: 'could not find threads'});
      res.json(titles);
    });
  });

  router.get('/tags/', eatAuth(appSecret), function(req, res) {
    Thread.find({users: req.user.name}, 'subject', function(err, titles) {
      if (err) return res.status(500).send({msg: 'could not find threads'});
      res.json(titles)
    })
  })

  router.get('/:id', function(req, res) {
    Thread.findOne({_id: req.params.id}, function(err, thread) {
      if (err) return res.status(500).send({msg: 'could not find threads'});
      Post.find({threadId: req.params.id}, function(err, posts) {
        if (err) return res.status(500).send({msg: 'could not find threads'});
          res.json({thread: thread, posts: posts});
      });
    });
  });
};
