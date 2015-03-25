'use strict';

var _ = require('lodash');
var debug = require('debug')('flipr-etcd-seed');
var util = require('util');

module.exports = ensureKeysAreUnique;

function ensureKeysAreUnique(dir, configs, cb) {
  var mergedConfigs = [];
  mergedConfigs = mergedConfigs.concat.apply(mergedConfigs, configs);
  var allKeys = _(mergedConfigs)
    .reduce(function(result, item){
      return result.concat(_.keys(item));
    }, []);
  debug('All keys for %s: %s', dir, allKeys);
  var uniqueKeys = _.uniq(allKeys);
  debug('Unique keys for %s: %s', dir, uniqueKeys);
  if(allKeys.length !== uniqueKeys.length)
    return cb(new Error(util.format('Found duplicate keys in %s', dir)));
  cb(null, mergedConfigs);
}