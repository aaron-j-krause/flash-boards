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

  after(function(done) {
    process.env.TEST_MODE = false;
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
      .post('/user/')
      .send({name: 'testguytwo', password: 'password',
            email:'anotheremail@example.com'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should GET a list of users', function(done) {
    chai.request('localhost:3000')
      .get('/user/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty; //jshint ignore:line
        done();
      });
  });

});
