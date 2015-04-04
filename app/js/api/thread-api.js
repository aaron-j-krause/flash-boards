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
  })
}
