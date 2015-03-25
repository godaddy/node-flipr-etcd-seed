'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var yaml = require('js-yaml');
var debug = require('debug')('flipr-etcd-seed');

module.exports = readFilesYaml;

function readFilesYaml(options, filePaths, cb) {
  var absoluteFilePaths = _.map(filePaths, function(filePath){
    return path.resolve(options.configPath, filePath);
  });
  debug('Yaml absolute file paths: ', absoluteFilePaths);
  async.waterfall([
    async.apply(readFiles, absoluteFilePaths),
    parseFiles
  ], cb);
}

function readFiles(absoluteFilePaths, cb) {
  async.map(absoluteFilePaths, _.partial(fs.readFile, _, {encoding: 'utf8'}, _), cb);
}

function parseFiles(files, cb) {
  async.map(files, function(file, mapCb) {
    try {
      mapCb(null, yaml.safeLoad(file));
    } catch (e) {
      mapCb(e);
    }
  }, cb);
}