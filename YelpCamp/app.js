var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var campgrounds = [
  { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
  { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
  { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" }
]

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds })
})

app.post('/campgrounds', (req, res) => {
  // get data from form and add too campgrounds array
  // redirect back to campgrounds page
  res.send('hello i am here')
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
