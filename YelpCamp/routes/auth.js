var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')

// Root route
router.get('/', (req, res) => {
  // res.render('landing')
  res.redirect('/campgrounds')
})

// Show the register form
router.get('/register', (req, res) => {
  res.render('register')
})

// Handle signup logic
router.post('/register', (req, res) => {
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err.message)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      console.log(user)
      res.redirect('/campgrounds')
    })
  })
})

// Show the login form
router.get('/login', (req, res) => {
  res.render('login')
})

// Handle the login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {})

// Logout route
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/campgrounds')
})

// Authentication check function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router
