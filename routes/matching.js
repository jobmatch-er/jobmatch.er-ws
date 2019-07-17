var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
if (req.user) {
  res.render('matching', { title: 'JobMatch.er | Find jobs' });
} else {
  res.render('login', { title: 'JobMatch.er | Anmeldung' });
}
});

module.exports = router;
