'use strict';

var Post = require('../models/post-model');
var Thread = require('../models/thread-model');

module.exports = function(router) {
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

  router.get('/:user', function(req, res) {
    Thread.find({author: req.params.user}, 'subject', function(err, titles){
      if (err) return res.status(500).send({msg: 'could not find threads'});
      res.json(titles);
    });
  });

  router.get('/all', function(req, res) {
    Thread.find({}, function(err, titles) {
      if (err) return res.status(500).send({msg: 'could not find threads'});
      console.log(titles)
      res.send(titles);
    });
  });
};
