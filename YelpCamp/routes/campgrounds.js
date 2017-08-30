var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')

// INDEX  - Show all campgrounds
router.get('/', (req, res) => {
  // get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds,
        currentUser: req.user
      })
    }
  })
})

// CREATE - add new campground to DB
router.post('/', isLoggedIn, (req, res) => {
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {
    name,
    image,
    description,
    author
  }
  console.log(newCampground)
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Woop, created a new campground');
      console.log(newlyCreated);
    }
  })
  res.redirect('/campgrounds')
})

// NEW - show form to create new campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

// SHOW - Shows more info about one campground
router.get('/:id', (req, res) => {
  var id = req.params.id
  Campground.findById(id).populate('comments').exec((err, selectedCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: selectedCampground})
    }
  })
})

// Authentication check function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router
