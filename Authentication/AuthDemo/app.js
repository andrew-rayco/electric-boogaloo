var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')

var User                  = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo_app', {useMongoClient: true})


var app = express()

app.set('view engine', 'ejs')

app.use(require('express-session')({
  secret: "Be hearty in your approbation and lavish in your praise",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/secret', (req, res) => {
  res.render('secret')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('AuthDemo started on port', PORT)
})
