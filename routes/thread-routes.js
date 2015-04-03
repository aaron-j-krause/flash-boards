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
};
