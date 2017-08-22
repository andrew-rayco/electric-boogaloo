var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true})
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "http://photosforclass.com/download/7121863467"
//   }, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Newly created campground');
//       console.log(campground);
//     }
//   }
// )

// var campgrounds = [
//   { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
//   { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
//   { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" },
//   { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
//   { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
//   { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" },
//   { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
//   { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
//   { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" },
//   { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
//   { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
//   { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" }
// ]

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  // get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds })
    }
  })
})

app.post('/campgrounds', (req, res) => {
  var name = req.body.name
  var image = req.body.image
  var newCampground = { name, image }
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

app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
