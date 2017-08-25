var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')

var User                  = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo_app', {useMongoClient: true})
mongoose.Promise = global.Promise

var app = express()


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(require('express-session')({
  secret: "Be hearty in your approbation and lavish in your praise",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))

// ===================
// ROUTES
// ===================

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/secret', (req, res) => {
  res.render('secret')
})

// Auth routes
// Show signup form
app.get('/register', (req, res) => {
  res.render('register')
})

// Handle user signup
app.post('/register', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret')
    })
  })
})

// Login routes
// render login form
app.get('/login', (req, res) => {
  res.render('login')
})

// Handle user login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), (req, res) => {
  res.send(req.body)
})

// Handle logout
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})



var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('AuthDemo started on port', PORT)
})
