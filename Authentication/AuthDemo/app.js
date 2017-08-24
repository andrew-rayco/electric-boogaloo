var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/auth_demo_app', {useMongoClient: true})

var app = express()

app.set('view engine', 'ejs')

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
