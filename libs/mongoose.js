/**
 * Created by Ruslan on 21-Apr-16.
 */

'use strict';

var mongoose = require('mongoose');
var config = require('../config');

// default to a 'localhost' configuration:
var connection_string = config.get('mongoose:uri');
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connection_string, config.get('mongoose:options'), function () {

});

mongoose.connection.on('open', function () {
  console.log('Database connected succesfully on ' + connection_string);
});

mongoose.connection.on('error', function (err) {
  console.log(err);
});



module.exports = mongoose;