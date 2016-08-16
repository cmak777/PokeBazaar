var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPage');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

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
