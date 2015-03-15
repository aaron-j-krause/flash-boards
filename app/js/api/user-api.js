var request = require('request');
var Promise = require('promise');

exports = module.exports = {};

function makePromise(method, url, body){
  return new Promise(function(resolve, reject) {
    request(method, url)
      .send(body)
      .end(function(err, res) {
        if (err) reject(err);
        else resolve(res);
      });
  });
};

exports.getAllUsers = function(){
  var promise = makePromise('GET', '/user/', null);

  return promise.catch(function(err) {
    console.log(err);
  })
};

exports.createNewUser = function() {
  var promise = makePromise('POST', '/user/');

  return promise.catch(function(err) {
    console.log(err);
  });
};
