/**
 * Created by Ruslan on 21-Apr-16.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
  .env()
  .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;