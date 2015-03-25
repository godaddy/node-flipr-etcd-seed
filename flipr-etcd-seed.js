'use strict';

var async = require('async');
var getAppConfig = require('./lib/get-app-config');
var getFliprConfig = require('./lib/get-flipr-config');
var mergeFliprConfig = require('./lib/merge-flipr-config');
var validateFliprConfig = require('./lib/validate-flipr-config');
var pushToEtcd = require('./lib/push-to-etcd');

module.exports = fliprEtcdSeed;

function fliprEtcdSeed(options, cb) {
  var appConfig = getAppConfig(options);
  async.waterfall([
    async.apply(async.parallel, [
      async.apply(getFliprConfig, appConfig, 'common'),
      async.apply(getFliprConfig, appConfig, appConfig.environment)
    ]),
    mergeFliprConfig,
    validateFliprConfig,
    async.apply(pushToEtcd, appConfig)
  ], cb);
}