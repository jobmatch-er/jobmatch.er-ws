var express = require('express');
var router = express.Router();
var fetcher = require('../fetcher.js')

router.get('/', function(req, res, next) {
if (req.user) {
  fetcher.sendMatcherReq(req.user, function (err, data) {
    console.log(data)
    res.render('matching', { 
      title: 'JobMatch.er | Find jobs' ,
      user: req.user.data,
      data: data
  });
  })
} else {
  res.render('login', { title: 'JobMatch.er | Anmeldung' });
}
});

module.exports = router;
