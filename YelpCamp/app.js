var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var methodOverride = require('method-override')

var Campground = require('./models/campground')
var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')

var campgroundRoutes = require('./routes/campgrounds')
var commentRoutes = require('./routes/comments')
var authRoutes = require('./routes/auth')

var app = express()

mongoose.Promise = global.Promise //mpromise is deprecated, use global instead
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
// seedDB() // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({secret: "Be hearty in your approbation and lavish in your praise.", resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Middleware to make user object available to all views (for nav header login/out)
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// Routes
app.use(authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
