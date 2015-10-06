var express = require('express');
var router = express.Router();
var app = express();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var methodOverride = require('method-override');


require("../config/passport")(passport);


app.use( cookieParser() );
app.use(expressSession({
		secret: 'mySecretKey',
		saveUninitialized: true,
		resave: true}));
app.use(passport.initialize());
app.use(passport.session());

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



router.use('/places', require('./places'));

router.get('/', function(req, res){
	res.render('layout', {user: req.user});
});

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);

router.get('/logout', function(req, res){
	req.logout();
	res.redirect("/");
})

module.exports = router;
