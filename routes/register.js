var express = require('express');
var router = express.Router();
var Customer = require('../models/customer')
var Auction=require('../models/auction')

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
        error: "This username or email address is already registered"
      });

    // Okay to create
    var u = new Customer({
      // username is phone number
      username: req.body.username,
      email: req.body.email,
      password: Customer.generateHash(req.body.password)
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log("Created new user:");
      console.log(user);
      res.redirect('/login')

    });
  });
});

router.get('/', function(req, res, next) {
  if (req.user)
  {res.render('mainPage', {user:true})}
  else{
    res.render('mainPage', {user:false})
  }
});

router.post('/', function(req, res, next) {
  res.redirect('/results');
});

router.get('/results', function(req, res, next) {
  res.render('results');
});

router.post('/results', function(req, res, next) {
  res.render('results');
});

router.get('/auctions/new',function(req,res,next){
  if(!req.user)
    {
      res.redirect('/login');
    }
    else
    {
        res.render('newAuction')
    }
})

router.post('/auctions/new',function(req,res,next){
  var a = new Auction({
    seller: req.user.id,
    sellerPokemon: req.body.sell,
    sellerCP: req.body.sellcp,
    buyerPokemon: req.body.buy,
    buyerCP: req.body.buycp,
    description: req.body.description,
    completed: false
  }).save(function(err){
    if (err){res.status(500).send("error saving auction")}
    res.redirect('/myProfile')
  })

})

// Beyond this point the user must be logged in
// Note: code duplicated in shop.js
router.use(function(req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect('/login');
  next();
});

router.get('/myProfile', function(req, res, next) {
  Auction.find({seller: req.user.id},function(error,auctions){
    if (error){console.log(error)}
    // console.log("THESE ARE WHAT THE AUCTIONS LOOK LIKE", auctions)
    res.render('profile',{list:auctions});
  })

});

router.get('/auctions/:id', function(req, res, next) {
  res.render('profile');
});

router.get('/auctions/owner/:id/', function(req, res, next) {
  res.render('profile');
});




module.exports = router;
