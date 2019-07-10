var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/matching', function(req, res, next) {
  res.render('matching', {});
});

module.exports = router;
