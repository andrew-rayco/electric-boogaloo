var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  var campgrounds = [
    { name: "Salmon Creek", image: "http://photosforclass.com/download/2123340163" },
    { name: "Granite Hill", image: "http://photosforclass.com/download/7121863467" },
    { name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/2602356334" }
  ]
  res.render('campgrounds', { campgrounds })
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('YelpCamp is alive on port', PORT)
})
