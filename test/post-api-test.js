process.env.MONGO_URI = 'mongodb://localhost/test_db';
process.env.TEST_MODE = true;
require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var User = require('../models/userSchema');
chai.use(chaihttp);

describe('User API', function() {
  var userId;
  var editPostId;
  var delPostId;
  before(function(done) {
    chai.request('localhost:3000')
      .post('/user/')
      .send({name:'testguy', password:'password', email:'email@example.com'})
      .end(function(err, res) {
        chai.request('localhost:3000')
          .post('/posts/testguy')
          .send({author: 'testguy', body: 'USE POST'})
          .end(function(err, res) {
            editPostId = res.body._id;
            chai.request('localhost:3000')
              .post('/posts/testguy')
              .send({author: 'testguy', body: 'DELETE POST'})
              .end(function(err, res) {
                delPostId = res.body._id;
                done();
              });
          });
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get a list of posts', function(done) {
    chai.request('localhost:3000')
      .get('/posts')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should create a new post', function(done) {
    chai.request('localhost:3000')
      .post('/posts/testguy')
      .send({author: 'testguy', body: 'test post'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should update a post', function(done) {
    chai.request('localhost:3000')
      .put('/posts/' + editPostId)
      .send({body: 'USED POST'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should delete a post', function(done) {
    chai.request('localhost:3000')
      .delete('/posts/' + delPostId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

});
