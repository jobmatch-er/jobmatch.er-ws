var express = require('express');
var router = express.Router();
var passport = require('passport')


/* GET home page. */
router.get('/login', function(req, res) {
  console.log("Userdata after auth", req.user)
  res.render('login');
});

router.post('/login',
passport.authenticate('local-login' , {failureRedirect:'/login', failureFlash: true}),
function(req, res) {
  res.redirect('/contact?' + req.user.data.email);
});

router.post('/sign-up',
passport.authenticate('local-register' , {failureRedirect:'/sign-up', failureFlash: true}),
function(req, res) {
  res.redirect('/login');
});

router.post('/logout',
function(req, res) {
  req.logOut();
  req.redirect("/");
});

module.exports = router;
