'use strict';

var util = require('util');
var glob = require('glob');
var debug = require('debug')('flipr-etcd-seed');

module.exports = getFilePaths;

function getFilePaths(options, dir, cb) {
  var globPattern = getGlobPattern(options, dir);
  debug('Using glob pattern: ', globPattern);
  glob(globPattern, cb);
}

function getGlobPattern(options, dir) {
  return util.format('%s/%s', 
    options.configPath, 
    util.format('%s/**/*.%s', 
      dir, 
      options.formatGlobPattern
    )
  );
}