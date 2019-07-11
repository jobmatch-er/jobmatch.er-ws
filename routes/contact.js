var express = require('express');
var router = express.Router();
var utils = require('../utils/utils')

/* GET home page. */
router.get('/', utils.isLoggedIn, function(req, res, next) {
  res.send(req.session);
});

module.exports = router;
