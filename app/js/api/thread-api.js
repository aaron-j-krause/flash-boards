'use strict';

var Promise = require('promise');
var ThreadActions = require('../actions/thread-actions');
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

exports.createNewThread = function(thread) {
  var promise = makePromise('POST', '/threads/', thread);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.getThreadsByUser = function(user) {
  var url = '/threads/titles/radguy';
  var promise = makePromise('GET', url, null);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.getThreadById = function(id) {
  var url ='/threads/' + id;
  var promise = makePromise('GET', url, null);
  return promise.catch(function(err) {
    console.log(err);
  });
};

exports.getThreadsByTag = function(user) {
  var url = '/threads/tags/' + user;
  var promise = makePromise('GET', url, null);
  return promise.catch(function(err) {
    console.log(err);
  })
};

exports.updateLocal = function(post) {
  return Promise.resolve(post);
}

exports.setSubject = function(subject) {
  return Promise.resolve(subject);
}
