process.env.NODE_ENV = 'test';
var app = require('../app');
var request = require('supertest');
var should = require("should");
var Account = require("../models/account");


describe("User Routes", function() {

  before(function(done) {
    var user = new Account({
      username: 'test@test.com',
      password: 'testy',
      admin: true,
    });

    user.save(function (err, results) {
      done();
    });

  });

  after(function(done) {
    Account.collection.drop();
    done();
  });

  it('finds a user by username', function(done) {
    Account.findOne({username: 'test@test.com'}, function(err, user) {
      user.username.should.eql('test@test.com');
      done();
    });
  });

  it('finds all users', function(done) {
    Account.find({}, function(err, user) {
      user.length.should.eql(1);
      done();
    });
  });

  it ('should return a view if user is logged in', function(done) {
    request(app)
      .post('/login')
      .send('username=test@test.com')
      .send('password=testy')
      .end(function (err, res) {
        res.statusCode.should.eql(302);
        res.header.location.should.eql('/');
      });
      done();
  });


});