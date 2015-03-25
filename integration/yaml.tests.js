'use strict';

var path = require('path');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var sutPath = '../flipr-etcd-seed';
var etcdSpy;
var sut;

var defaultOptions = {
  configPath: path.resolve(__dirname, './fixtures/yaml'),
  format: 'yaml'
};

describe('yaml config files', function(){
  beforeEach(function(){
    etcdSpy = sinon.spy(function(options, config, cb){
      cb(null, config);
    });
    sut = proxyquire(sutPath, {
      './lib/push-to-etcd': etcdSpy 
    });
  });
  it('sends basic config to etcd', function(done){
    sut(defaultOptions, function(err, result){
      if(err) done(err);
      expect(result).to.eql({
        thisKeyIsShared: {
          value: 'somevalue' 
        },
        someKey: {
          value: 'somevalue'
        },
        thisKeyWillBeOverriden: {
          value: 'somevalue'
        },
        otherKey: {
          value: 'somevalue'
        }
      });
      done();
    });
  });
  it('errors if yaml does not pass flipr validation', function(done){
    var options = _.defaults({
      configPath:  path.resolve(__dirname, './fixtures/invalid-yaml'),
    }, defaultOptions);
    sut(options, function(err){
      expect(err).to.eql([
        new Error('config item values must be an array with at least one value for key "thisKeyIsShared"'),
        new Error('config item value must be defined for key "valueMustBeDefined"')
      ]);
      done();
    });
  });
});