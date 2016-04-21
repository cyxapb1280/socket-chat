/**
 * Created by Ruslan on 19-Apr-16.
 */
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('./libs/mongoose');
var MongoStore = require('connect-mongo')(session);
var User = require('./models/user').User;
var async = require('async');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(session({
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  maxAge: new Date(Date.now() + 3600000),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

app.post('/login', function (req, res, next) {
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

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.broadcast.emit('broadcast', 'New guest connected.');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('message', function (message) {
    socket.broadcast.emit('broadcast', message);
  });


});

http.listen(server_ip_address + ':' + server_port, function () {
  console.log('listening on *:3000');
});