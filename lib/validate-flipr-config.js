'use strict';

var fliprValidation = require('flipr-validation');
var debug = require('debug')('flipr-etcd-seed');

module.exports = validateFliprConfig;

function validateFliprConfig(config, cb) {
  debug('Validating flipr config');
  var result = fliprValidation({
    config: config
  });
  if(result.length > 0)
    return cb(result);
  cb(null, config);
}