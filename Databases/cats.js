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

// var george = new Cat({
//   name: "Mrs Norris",
//   age: 7,
//   temperament: "Evil"
// })
//
// george.save((err, cat) => {
//   if (err) {
//     console.log('Something went wrong. Soz.')
//   } else {
//     console.log("We just saved a cat to the database!")
//     console.log(cat)
//   }
// })


Cat.create({
  name: "Show White",
  age: 15,
  temperament: "Bland"
}, (err, cat) => {
  if(err) {
    console.log(err);
  } else {
    console.log(cat);
  }
})

// retrieve all cats from the db and console.log each one

Cat.find({}, (err, cats) => {
  if(err) {
    console.log('Oh no, error!');
    console.log(err);
  } else {
    console.log('=== All the cats ===');
    console.log(cats);
  }
})
