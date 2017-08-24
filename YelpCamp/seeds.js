var mongoose = require('mongoose')
var Campground = require('./models/campground')

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg",
    description: "Gets pretty hot out here on some days. Cold at nights. Pretty though."
  },
  {
    name: "Boney Potanga",
    image: "https://farm5.staticflickr.com/4176/34533122526_13d698e62a.jpg",
    description: "Weird name. The place is cool as shit though."
  },
  {
    name: "Dove's Pier",
    image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
    description: "Weird that there's no doves here. Or a pier for that matter."
  }
]

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('removed all campgrounds');
    // add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log('== Added a new campground ==');
        console.log(data);
      })
    })
  })
  // add a few comments
}

module.exports = seedDB
