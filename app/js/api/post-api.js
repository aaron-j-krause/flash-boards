'use strict';

var Promise = require('promise');
var PostActions = require('../actions/post-actions');
var request = require('superagent');

exports = module.exports = {};

function makePromise(method, url, body) {
  return new Promise(function(resolve, reject) {
    request(method, url)
      .send(body)
      .end(function(err, res) {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

exports.getPostsByThreadId = function(id) {
  var promise = makePromise('GET', '/posts/' + id, null);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.createNewPost = function(post) {
  console.log('IN API', post);
  var promise = makePromise('POST', '/posts/', post);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.updatePost = function(post) {
  var promise = makePromise('PUT', '/posts/', post);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.deletePost = function(post) {
  var url = '/posts/' + post._id;
  var promise = makePromise('DELETE', url, null);
  return promise.catch(function(err) {
    console.log(err);
  });
};
