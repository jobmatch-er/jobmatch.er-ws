var express = require('express');
var router = express.Router();
var passport = require('passport')


/* Some routes for authentication to be sure, 
*  that we are telling the right people the jobs
*/
router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect("/matching");
} else {
  res.render('login', { title: 'JobMatch.er | Anmeldung', failureMsg: req.flash("failureMsg") });
}
});

router.post('/login',
passport.authenticate('local-login' , {failureRedirect:'/auth/login', failureFlash: true}),
function(req, res) {
  res.redirect('/matching');
});

router.get('/sign-up',
function(req, res) {
  if (req.user) {
    res.redirect("/auth/login");
} else {
  res.render('signup', { title: 'JobMatch.er | Registrierung', failureMsg: req.flash("failureMsg") });
}
});

router.post('/sign-up',
passport.authenticate('local-signup' , {failureRedirect:'/auth/sign-up', failureFlash: true}),
function(req, res) {
  res.redirect('/auth/login');
});

router.post('/logout',
function(req, res) {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
