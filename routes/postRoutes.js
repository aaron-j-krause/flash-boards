var Post = require('../models/postSchema');
var User = require('../models/userSchema');

module.exports = function(router) {
  //on base route /posts
  router.post('/:name', function(req, res) {
    var post = new Post({body: req.body.body, author: req.body.user});
    User.findOne({name: req.params.name}, function(err, user) {
      if (err || user === null)
        return res.status(500).send('Could not find user');
      post.userId = user._id;
      post.save(function(err, post) {
        res.json(post);
      });
    });
  });

  router.put('/:post', function(req, res) {
    Post.findOneAndUpdate({_id: req.params.post}, {body: req.body.body},
      function(err, post) {
      if (err) return res.status(500).send('Could not find user');
      res.json({msg: 'post updated'});
    });
  });

  router.delete('/:post', function(req, res) {
    Post.findOneAndRemove({_id: req.params.post}, function(err, post) {
      if (err) return res.status(500).send('Could not find user');
      res.json(post);
    });
  });

  router.get('/', function(req, res) {
    Post.find(function(err, posts) {
      if (err) return res.status(500).send('Could not find posts');
      res.json(posts);
    });
  });
};
