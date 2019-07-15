var express = require('express');
var router = express.Router();
var passport = require('passport')


/* GET home page. */
router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect("/contact");
} else {
  res.render('login', { title: 'JobMatch.er | Anmeldung' });
}
});

router.post('/login',
passport.authenticate('local-login' , {failureRedirect:'/auth/login', failureFlash: true}),
function(req, res) {
  res.redirect('/contact?' + req.user.data.email);
});

router.get('/sign-up',
function(req, res) {
  if (req.user) {
    res.redirect("/contact");
} else {
  res.render('signup', { title: 'JobMatch.er | Registrierung' });
}
});

router.post('/sign-up',
passport.authenticate('local-register' , {failureRedirect:'/auth/sign-up', failureFlash: true}),
function(req, res) {
  res.redirect('/login');
});

router.post('/logout',
function(req, res) {
  req.logOut();
  req.redirect("/");
});

module.exports = router;
