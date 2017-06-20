var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var multer  = require('multer');
var mysql = require('mysql');
var client = require('twilio')('AC0570f33a02132525cac87aef55bbaa32','d5c1f50d4ad27b4cb19e9116f872bc8f');
var routes = require('./routes/index');
var users = require('./routes/users');
var insert = require('./routes/insert');
var fine_gen = require('./routes/fine_gen');
var pay = require('./routes/pay');
var insert_admin = require('./routes/insert_admin');
var gprs = require('./routes/gprs');
var insert_user = require('./routes/insert_user');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list' //name of the local database 
	});


connection.connect(function(err) { 
if(!err) {
 	console.log("connected to database");
       }
else {
	console.log("error connecting to the database");
     }
});     
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/insert', insert);
app.use('/api/fine_gen', fine_gen);
app.use('/api/pay', pay);
app.use('/api/insert_admin', insert_admin);
app.use('/api/gprs', gprs);
app.use('/api/insert_user', insert_user);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
