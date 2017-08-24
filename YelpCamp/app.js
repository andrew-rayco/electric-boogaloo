var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var Campground = require('./models/campground')
var Comment = require('./models/comment')
var seedDB = require('./seeds')


var app = express()

mongoose.Promise = global.Promise //mpromise is deprecated, use global instead
seedDB()
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true})
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


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



var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
