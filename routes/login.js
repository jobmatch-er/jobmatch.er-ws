var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', passport.authenticate('local-login', {
failureRedirect: '/login',
failureFlash: true ,
successFlash: 'Welcome!'}),
function(req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
});

module.exports = router;
