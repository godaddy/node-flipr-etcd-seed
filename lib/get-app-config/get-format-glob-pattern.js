'use strict';

var debug = require('debug')('flipr-etcd-seed');

module.exports = getFormatGlobPattern;

function getFormatGlobPattern(format) {
  debug('Getting format glob pattern for %s', format);
  switch(format) {
    case 'json':
      return 'json';
    case 'yaml':
      return '+(yaml|yml)';
    default:
      return '+(yaml|yml)';
  }
}