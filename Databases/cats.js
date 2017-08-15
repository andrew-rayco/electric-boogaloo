var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true})

mongoose.Promise = global.Promise

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
})

var Cat = mongoose.model("Cat", catSchema)


// adding a cat to the db

var george = new Cat({
  name: "George",
  age: 11,
  temperament: "Grouchy"
})

george.save((err, cat) => {
  if (err) {
    console.log('Something went wrong. Soz.')
  } else {
    console.log("We just saved a cat to the database!")
    console.log(cat)
  }
})

// retrieve all cats from the db and console.log each one
