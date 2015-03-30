process.env.NODE_ENV = 'test';
var should = require("should");
var config = require('../_config');
var app = require('../app');

console.log()

describe('app environment', function(){
  it ('should be "test"', function(done) {
    process.env.NODE_ENV.should.eql('test');
    process.env.NODE_ENV.should.not.eql('development');
    process.env.NODE_ENV.should.not.eql('stage');
    config.mongoURI[app.settings.env].should.eql('mongodb://localhost/passport_mocha_test')
    config.mongoURI[app.settings.env].should.not.eql('mongodb://localhost/passport_mocha')
    done();
  });
});