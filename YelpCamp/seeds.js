var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg",
    description: "Gets pretty hot out here on some days. Cold at nights. Pretty though. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aut odit accusamus ab cupiditate! Harum, in. Fuga, obcaecati, sed! Provident ipsa labore vel ullam magni doloribus quae, beatae, culpa alias?"
  },
  {
    name: "Boney Potanga",
    image: "https://farm5.staticflickr.com/4176/34533122526_13d698e62a.jpg",
    description: "Weird name. The place is cool as shit though. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, similique? Iste repellat, aspernatur sapiente ratione! Minus perspiciatis est in quam laboriosam enim, laudantium incidunt esse itaque provident, magni, blanditiis aperiam."
  },
  {
    name: "Dove's Pier",
    image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
    description: "Weird that there's no doves here. Or a pier for that matter. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis dicta id voluptas, corrupti iste, dolor vel molestiae numquam obcaecati libero sapiente, doloremque quis modi voluptatibus repellat rerum error! Doloribus, quasi."
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
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        }
        console.log('== Added a new campground ==');
        // add a few comments
        Comment.create({
          text: "This place is great but I wish there was internet",
          author: "Homer"
        }, (err, comment) => {
          if (err) {
            console.log(err);
          }
          campground.comments.push(comment)
          campground.save()
          console.log('Created new comment');
        })
      })
    })
  })
}

module.exports = seedDB
