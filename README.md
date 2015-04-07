node-flipr-etcd-seed
====================

**Stability: 1 - Experimental** 

[![NPM](https://nodei.co/npm/flipr-etcd-seed.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/flipr-etcd-seed/)

[![Build Status](https://travis-ci.org/godaddy/node-flipr-etcd-seed.svg)](https://travis-ci.org/godaddy/node-flipr-etcd-seed)

This project is part of the [flipr family](https://github.com/godaddy/node-flipr).

Validate and upload your flipr configuration to Etcd, to be consumed by [flipr-etcd](https://github.com/godaddy/node-flipr-etcd).  Understands YAML and JSON files.

The main use case for flipr-etcd-seed is storing config for all your environments in yaml/json files, putting those files in a git repository, using github's text editor to edit/commit changes to those config files, and using CI + flipr-etcd-seed to validate/push the changes to your etcd cluster.  Once the config is pushed to your etcd cluster, your application's config will be automatically updated by flipr.

![node-flipr](/flipr.png?raw=true "node-flipr")

# Usage
flipr-etcd-seed expects yaml/json files to be stored in a specific directory structure
```
-root_config_dir
 -common
  some_config.yml
 -dev
  other_config.yml
 -test
  blahblah.yml
 -stage
  any_name_works.yml
 -prod
  must_end_with_dot_yaml_or_yml.yaml
 -some_other_environment
  multiple_files_work.yml
  as_long_as_keys_are_unique.yml
```

You can name your environments and yaml files whatever you like (alphanumeric, underscores, dashes, no whitespace).  `common` is reserved for configuration that does not change between environments.  It will be added to config for all other environments. You can override keys defined in `common` in other environments.  If you use multiple files in a single environment, the keys must be unique.

```
npm install -g flipr-etcd-seed

flipr-etcd-seed --config-path /some/path/to/config --host my.etcd.url.com --directory myapp --environment dev
```

Running those commands will install flipr-etcd-seed globally, grab all the yaml files in /some/path/to/config/common and /some/path/to/config/dev recursively, mash them together, validate them using [flipr-validation](https://github.com/godaddy/node-flipr-validation), and upload the config to Etcd under ~v2/keys/flipr/myapp/dev.

```
flipr-etcd-seed --config-path /some/path/to/config --host my.etcd.url.com
```

Running that command will grab all yaml files in /some/path/to/config/common and /some/path/to/config/default recursively, mash them together, validate them using flipr-validation, and upload them to Etcd under ~v2/keys/flipr/default/config.

If you fail validation or receive any other error, nothing will be uploaded to Etcd.

# Options
Use `flipr-etcd-seed --help` to see:

```
Usage: flipr-etcd-seed [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -c, --config-path <path>  REQUIRED - Path to directory containing config files
    -d, --directory <name>    RECOMMENDED - The etcd directory to save the config under.  Usually the name of your application.  Alphanumeric, hyphen, and underscore only, no whitespace. Default is "default"
    -h, --host <name>         RECOMMENDED - The ip/domain/hostname of your etcd server.  Default is "127.0.0.1".
    -e, --environment <name>  RECOMMENDED - The environment you are targetting.  Should match a directory under your config-path. Alphanumeric, hyphen, and underscore only.  Default is "default"
    -k, --key <name>          The etcd key to save the config under.  Typically the environment you are targetting. Alphanumeric, hyphen, and underscore only, no whitespace. Default is "config"
    -p, --port <int>          The port your etcd server is listening on.  Default is 4001.
    -f, --format <type>       Config file format.  Accepts "json" or "yaml".  Defaults to "yaml".
    -C, --console             Output config to console instead of sending to host.  Defaults to off.
```

# Other Stuff

* You can use flipr-etcd-seed programatically.  Check out the [sample section](sample/programatically.js).
* We don't support SSL when communicating with Etcd just yet.  We plan to in the future.