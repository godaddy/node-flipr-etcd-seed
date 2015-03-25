'use strict';

var util = require('util');
var async = require('async');
var debug = require('debug')('flipr-etcd-seed');
var ensureKeysAreUnique = require('./ensure-keys-are-unique');

module.exports = getFliprConfig;

function getFliprConfig(options, dir, cb) {
  debug('Getting flipr config for %s', dir);
  async.waterfall([
    async.apply(require('./get-file-paths'), options, dir),
    async.apply(readFiles(options.format), options),
    async.apply(ensureKeysAreUnique, dir)
  ], cb);
}

function readFiles(format) {
  return require(util.format('./%s/read-files', format));
}

