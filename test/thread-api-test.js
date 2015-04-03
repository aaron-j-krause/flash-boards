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
  var delThreadId;
  var putThreadId;

  before(function(done) {
    chai.request('localhost:3000')
      .post('/threads/')
      .send({
        author: 'testuser',
        subject: 'testdeletethread'
      }).end(function(err, res) {
        delThreadId = res.body._id;
        chai.request('localhost:3000')
          .post('/threads/')
          .send({
            author: 'testuser',
            subject: 'testputthread'
          }).end(function(err, res) {
            putThreadId = res.body._id;
            done();
          });
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a thread', function(done) {
    chai.request('localhost:3000')
      .post('/threads/')
      .send({
        author: 'testuser',
        subject:'testsubject',
        users:['testtagone', 'testtagtwo']
      }).end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.author).to.eql('testuser');
        done();
      });
  });

  it('should add users to a thread', function(done) {
    chai.request('localhost:3000')
      .put('/threads/tags')
      .send({
        id: putThreadId,
        users: ['testtagone', 'testtagtwo']
      }).end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.users).to.include('testtagone');
        expect(res.body.users).to.have.length(2);
        done();
      });
  });

  it('should delete a thread', function(done) {
    chai.request('localhost:3000')
      .del('/threads/' + delThreadId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.subject).to.eql('testdeletethread');
        done();
      });
  });
});
