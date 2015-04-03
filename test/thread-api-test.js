'use strict';

process.env.MONGO_URI = 'mongodb://localhost/test_db';
process.env.TEST_MODE = true;
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Thread API', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should create a thread');
  it('should add users to a thread');
  it('should delete a thread');
});
