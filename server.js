/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

var express = require('express');
var app = express();

var http = require('http').Server(app);
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('./libs/mongoose');
var MongoStore = require('connect-mongo/es5')(session);
var router = require('./routes/index');

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
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', router);

require('./socket')(http);

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || config.get('ip');
var port    = process.env.OPENSHIFT_NODEJS_PORT || config.get('port');

http.listen(port, ip_addr, function () {
  console.log('Server listening on '+ ip_addr + ':' + port);
});