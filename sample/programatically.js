'use strict';

// This sample shows you how to interact with flipr-etcd-seed programatically,
// instead of using the CLI.  

var path = require('path');
var fliprEtcdSeed = require('../flipr-etcd-seed.js');

fliprEtcdSeed({
  configPath: path.resolve(__dirname, 'yaml'),
  format: 'yaml',
  host: '10.0.0.200'
}, function(err, etcdResult){
  if(err) console.error(err);
  console.log(etcdResult);
});