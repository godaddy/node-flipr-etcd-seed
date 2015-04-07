'use strict';

// Get, validate, and translate config for flipr-etcd-seed

var path = require('path');
var util = require('util');
var _ = require('lodash');
var debug = require('debug')('flipr-etcd-seed');
var getFormatGlobPattern = require('./get-format-glob-pattern');

var options;
var defaultOptions = {
  environment: 'default',
  directory: 'default',
  key: 'config',
  host: '127.0.0.1',
  port: 4001,
  format: 'yaml',
  console: false
};
var config;

module.exports = getAppConfig;

//First call of getConfig requires options to be passed.
//Options will be cached after first call.
function getAppConfig(newOptions) {
  if(newOptions) {
    options = newOptions;
    config = null;
  }
  if(config)
    return config;
  
  _.defaults(options, defaultOptions);

  if(!options)
    throw new Error ('You have called getAppConfig without options, first call must pass options.');
  if(!options.configPath)
    throw new Error ('-c is a required argument.  It should contain an absolute path to the config directory.');
  if (!isAlphanumericPlus(options.environment))
    throw new Error('-e must be alphanumeric, hyphens, or underscores, with no whitespace (0-9, a-z, A-Z, -, _)');
  if (!isAlphanumericPlus(options.directory))
    throw new Error('-d must be alphanumeric, hyphens, or underscores, with no whitespace (0-9, a-z, A-Z, -, _)');
  if (!isAlphanumericPlus(options.key))
    throw new Error('-k must be alphanumeric, hyphens, or underscores, with no whitespace (0-9, a-z, A-Z)');
  if (options.format !== 'json' && options.format !== 'yaml')
    throw new Error('-f must be "json" or "yaml"');

  var newConfig = _.defaults({
    formatGlobPattern: getFormatGlobPattern(options.format),
    etcdKey: util.format('%s/%s/%s', 'flipr', options.directory, options.key),
    configPath: path.resolve(options.configPath)
  }, options);
  
  debug(newConfig);
  return newConfig;
}

function isAlphanumericPlus(val) {
  return /^[a-z0-9\-_]+$/i.test(val);
}
