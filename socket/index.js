/**
 * Created by Ruslan on 28-Apr-16.
 */
'use strict';

var Message = require('../models/message').Message;

module.exports = function (http) {
  var io = require('socket.io')(http);

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    socket.on('message', function (sentMessage) {
      var message = new Message({text: sentMessage.text, username: sentMessage.username});
      message.save(function (err) {
        if (err) return next(err);
      });

      socket.broadcast.emit('broadcast', message);
    });

    socket.on('join', function (username) {
      var message = new Message({text: '\'' + username + '\'' + ' has joined to the chat.', username: 'system'});
      message.save(function (err) {
        if (err) return next(err);
      });
      socket.broadcast.emit('broadcast', message);
    })
  });
};