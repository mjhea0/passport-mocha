process.env.NODE_ENV = 'test';
var app = require('../app');
var should = require("should");
var Browser = require('zombie');
var Account = require("../models/account");

describe('Login Page', function(){

  var server;
  var browser;

  before(function(done) {
    server = app.listen(3001);

    var user = new Account({
      username: 'test@test.com',
      password: 'testy',
      admin: true,
    });

    user.save(function (err, results) {});

    done();
  });

  after(function(done) {
    server.close();
    Account.collection.drop();
    done();
  });

  beforeEach(function() {
    browser = new Browser();
  });

  it("should show the login form", function(done) {
    browser.visit("http://localhost:3001/login", function() {
      browser.wait().then(function() {
        (browser.text("h1")).should.equal('Login Page');
        (browser.text("form")).should.containEql('Submit');
      })
      done();
    });
  });

  // it("should allow a user to login", function(done) {
  //   browser.visit("http://localhost:3001/login", function() {
  //     browser.fill('input[name=username]', 'test@test.com');
  //     browser.fill('input[name=password]', 'testy');
  //     console.log(browser.document.forms[0].submit())
  //     browser.document.forms[0].submit();
  //     browser.wait().then(function() {
  //       console.log(browser.html())
  //       console.log('Form submitted ok!');
  //       browser.viewInBrowser();
  //     })
  //     done();
  //   });
  // });

});