'use strict';

var Etcd = require('node-etcd');
var debug = require('debug')('flipr-etcd-seed');

module.exports = pushToEtcd;

var client;

function pushToEtcd(options, config, cb) {
  if(!client) {
    debug('Creating a new Etcd client');
    client = new Etcd(options.host, options.port, options.ssl);
  }
  if(options.console) {
    debug('Sending to console');
    console.log('Key: ' + options.etcdKey);
    console.log(JSON.stringify(config, null, 2));
  } else {
    debug('Sending config to Etcd');
    client.set(options.etcdKey, JSON.stringify(config), { maxRetries: 3 }, cb);
  }
}
