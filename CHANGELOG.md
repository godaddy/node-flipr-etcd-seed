## v1.1.0 (April 7, 2015)

Features:

  - Added -C (--console) to output config to console instead of sending to etcd, useful for debugging

Bug Fixes:

 - Fixed issue with relative paths
 - Errors will now to be logged to console instead of being swallowed

## v1.0.0 (March 25, 2015)

Initial Release.

Features:

  - Send json or yaml files to etcd
  - Validates using flipr-validation
  - Supports config shared across environments, with the ability to override
  - Supports multiple files (keys must be unique)
