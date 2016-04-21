/**
 * Created by Ruslan on 21-Apr-16.
 */
var mongoose = require('mongoose');
var config = require('../config');

//provide a sensible default for local development
var db_name = 'scoketchat';
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);

module.exports = mongoose;