var Promise = require('promise');
var PostActions = require('../actions/post-actions');
var request = require('superagent');

exports = module.exports = {};

exports.getAllPosts = function(){
  var promise = new Promise(function(resolve, reject) {
    request
      .get('/posts/')
      .end(function(err, res) {
        if (err) reject(err);
        else resolve(res);
      })
  })
  return promise.catch(function(err){
    console.log(err);
  })
}

exports.createNewPost = function(post) {
  var promise = new Promise(function(resolve, reject) {
    request
      .post('/posts/')
      .send(post)
      .end(function(err, res) {
        if (err) reject(err);
        else resolve(res);
      })
  })
  console.log('in new post api');
  return promise.catch(function(err) {
    console.log(err);
  })
}