'use strict';

var Post = require('../models/post-model');
var Thread = require('../models/thread-model');

module.exports = function(app) {
  app.post('/', function(req, res) {
    var newThread = new Thread({
      author: req.body.author,
      subject: req.body.subject
    });
    newThread.save(function(err, thread) {
      if (err) return res.status(500).send({msg: 'could not save thread'});
      res.send(thread);
    })

  });

};
