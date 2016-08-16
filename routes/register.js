var express = require('express');
var router = express.Router();
var Customer = require('../models/customer')

// GET registration page
router.get('/register', function(req, res) {
  res.render('register');
});

// POST registration page
var validateReq = function(userData) {
  console.log (userData.username)
  return (userData.username && userData.password && userData.email &&
    (userData.password === userData.passwordRepeat));
};

router.post('/register', function(req, res, next) {
  // validation step
  if (!validateReq(req.body)) {
    console.log(req.body);
    return res.render('register', {
      error: "Fields missing or passwords don't match",
      data: req.body
    });
  }

  // Don't create duplicate users
  Customer.findOne({"$or": [{username: req.body.username}, {email: req.body.email}]}, function(err, user) {
    if (err) return next(err);
    if (user)
      return res.render('register', {
        error: "This phone number or email address is already registered"
      });

    // Okay to create
    var u = new Customer({
      // username is phone number
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log("Created new user:");
      console.log(user);
      res.redirect('/')

    });
  });
});


// Beyond this point the user must be logged in
// Note: code duplicated in shop.js
router.use(function(req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect('/login');
  next();
});



module.exports = router;
