'use strict';

var _ = require('lodash');
var debug = require('debug')('flipr-etcd-seed');

module.exports = mergeFliprConfig;

function mergeFliprConfig(configs, cb) {
  var mergedCommonConfig = _.reduce(configs[0], _.assign, {});
  var mergedEnvironmentConfig = _.reduce(configs[1], _.assign, {});
  var finalConfig = _.assign({}, mergedCommonConfig, mergedEnvironmentConfig);
  debug('Finished merging config %s', JSON.stringify(finalConfig, null, 2));
  cb(null, finalConfig);
}