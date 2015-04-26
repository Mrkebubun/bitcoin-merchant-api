var bitcoin = require('../lib/bitcoin');
var yaml = require('js-yaml');
var fs = require('fs');
var assert = require('assert');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

describe("lib/bitcoin", function () {
  before(function (done) {
    if (process.env.BITCOIN_RPC_USERNAME)
      config.bitcoin.username = process.env.BITCOIN_RPC_USERNAME;
    if (process.env.BITCOIN_RPC_PASSWORD)
      config.bitcoin.password = process.env.BITCOIN_RPC_PASSWORD;
    bitcoin.init(config, function (err) {
      if (err) return done(err);
      return done();
    });
  });
  it("should generate a new payment request", function (done) {
    bitcoin.generatePaymentRequest(100, 'USD', function (err, result) {
      if (err) return done(err);
      assert.equal(100, result.amount);
      assert.equal('USD', result.currency);
      //console.log(result);
      return done();
    });
  });
});