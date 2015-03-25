'use strict';

var path = require('path');
var _ = require('lodash');

module.exports = readFilesJson;

function readFilesJson(options, filePaths, cb) {
  var files = _.map(filePaths, function(filePath){
    var absolutePath = path.resolve(options.configPath, filePath);
    return require(absolutePath);
  });
  cb(null, files);
}
