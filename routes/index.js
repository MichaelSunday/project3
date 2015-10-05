var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressSession = require('')

app.use( cookieParser() );
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

require("./config/passport")(passport);

router.use('/places', require('./places'));

router.get('/', function(req, res){
	res.render('layout', {user: req.user});
});

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/places',
		failureRedirect: '/'
	})
);

router.get('/logout', function(req, res){
	req.logout();
	res.redirect("/");
})

module.exports = router;
