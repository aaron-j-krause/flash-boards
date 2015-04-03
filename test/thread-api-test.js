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
  it('should create a thread', function(done) {
    chai.request('localhost:3000')
      .post('/threads/')
      .send({author: 'testuser',
        subject:'testsubject',
        users:['testtagone', 'testtagtwo']
      }).end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.author).to.eql('testuser');
        done();
      })
  });
  it('should add users to a thread');
  it('should delete a thread');
});
