/**
 * Created by Ruslan on 24-Apr-16.
 */
'use strict';

var User = require('../models/user').User;
var Message = require('../models/message').Message;
var async = require('async');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

router.get('/history', function (req, res) {
  Message.find({}, function (err, messages) {
    res.send(messages);
  })
});

router.get('/user', function (req, res) {
  var id = req.session.user;

  User.findById(id, function (err, user) {
    if(user) {
      res.send({username: user.username});
    } else {
      res.statusCode = 403;
      res.end('Login to get access.');
    }
  })
});

router.post('/login', function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;

  async.waterfall([
    function (callback) {
      User.findOne({username: name}, callback);
    },
    function (user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          res.statusCode = 403;
          res.end('Wrong password for this username.');
        }
      } else {
        var user = new User({username: name, password: password});
        user.save(function (err) {
          if (err) return next(err);
          callback(null, user);
        });
      }
    },
    function (user) {
      req.session.user = user._id;
      res.send({username: user.username});
    }
  ]);

});

module.exports = router;