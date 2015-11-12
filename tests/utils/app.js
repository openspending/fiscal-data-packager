'use strict';

var Browser = require('zombie');
var start = require('../../app').start;

var exports = module.exports;

exports.app = null;
exports.browser = null;

exports.start = function(done) {
  this.timeout(20000);
  if (!exports.app) {
    // Run the server
    start().then(function(app) {
      exports.app = app;
      var port = app.get('port');
      Browser.localhost('127.0.0.1', port);
      exports.browser = new Browser({
        maxWait: 5000
      });
      done();
    });
  }
};

exports.shutdown = function(done) {
  exports.app.shutdown();
  exports.app = null;
  exports.browser = null;
  done();
};
