var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/results', function(req, res, next) {
  res.render('results');
});

router.get('/profile/:id', function(req, res, next) {
  res.render('profile');
});

router.get('/auctions/:id', function(req, res, next) {
  res.render('profile');
});

router.get('/auctions/owner/:id/', function(req, res, next) {
  res.render('profile');
});

module.exports = router;
