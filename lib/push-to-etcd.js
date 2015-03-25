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
  debug('Sending config to Etcd');
  client.set(options.etcdKey, JSON.stringify(config), { maxRetries: 3 }, cb);
}
