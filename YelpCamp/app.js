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
  image: String,
  description: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "http://photosforclass.com/download/7121863467",
//     description: "This is a huge granite hill. No bathrooms, no water. Beautiful granite."
//   }, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Newly created campground');
//       console.log(campground);
//     }
//   }
// )

app.get('/', (req, res) => {
  res.render('landing')
})

// INDEX  - Show all campgrounds
app.get('/campgrounds', (req, res) => {
  // get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds })
    }
  })
})

// CREATE - add new campground to DB
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

// NEW - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})


app.get('/campgrounds/:id', (req, res) => {
  var id = req.params.id
  Campground.findById(id, (err, selectedCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log('hooray it works!');
      console.log(id);
      res.render('show', {campground: selectedCampground})
    }
  })
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
