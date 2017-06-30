/**
 * Created by Ruslan on 25-Apr-16.
 */
'use strict';

var mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  text: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now()
  }
});

exports.Message = mongoose.model('Message', schema);