var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')


var Campground = require('./models/campground')
var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')


var app = express()

mongoose.Promise = global.Promise //mpromise is deprecated, use global instead
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
seedDB()

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Be hearty in your approbation and lavish in your praise.",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get('/', (req, res) => {
  // res.render('landing')
  res.redirect('/campgrounds')
})

// INDEX  - Show all campgrounds
app.get('/campgrounds', (req, res) => {
  // get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds })
    }
  })
})

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var newCampground = { name, image, description }
  Campground.create(newCampground, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Woop, created a new campground');
      console.log(res);
    }
  })
  res.redirect('/campgrounds')
})

// NEW - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

// SHOW - Shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  var id = req.params.id
  Campground.findById(id).populate('comments').exec((err, selectedCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: selectedCampground})
    }
  })
})

// ======================================
// COMMENTS ROUTES
// ======================================

app.get('/campgrounds/:id/comments/new', (req, res) => {
  var id = req.params.id
  Campground.findById(id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground})
    }
  })
})

app.post('/campgrounds/:id/comments', (req, res) => {
  // Lookup campground using id
  var id = req.params.id
  Campground.findById(id, (err, campground) => {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      // Create comment
      var newComment = req.body.comment
      console.log(newComment)
      Comment.create(newComment, (err, createdComment) => {
        if (err) {
          console.log(err)
        } else {
          // Associate comment with campground
          campground.comments.push(createdComment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})


// ======================================
// AUTH ROUTES
// ======================================
// Show the register form
app.get('/register', (req, res) => {
  res.render('register')
})

// Handle signup logic
app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
  res.render('login')
})

// Handle the login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
