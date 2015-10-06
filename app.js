'use strict'

require('dotenv').load();


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('express-session');
var expressSession = require('express-session');

var placesController = require('./routes/places');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var dbConfig = require('./db/config.js');
var mongoose = require('mongoose');

switch(app.get('env')){
    case 'development':
        mongoose.connect(dbConfig.mongo.dev.conn, dbConfig.mongo.options);
        break;
    case 'production':
        mongoose.connect(dbConfig.mongo.prod.conn, dbConfig.mongo.options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use( cookieParser() );
// app.use(expressSession({secret: 'mySecretKey',
//         saveUniniatialized: true,
//         resave: true}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// require("./config/passport")(passport);

// app.get('/', function(req, res){
//   res.render('layout', {user: req.user});
// });
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   })
// );
// app.use('/users', users);
app.use('/', placesController);
app.use('/', routes);

module.exports = app;


console.log('server starting...go to localhost:8080');
