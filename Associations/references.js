var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog-demo_2', {useMongoClient: true})

var Post = require('./models/post')
var User = require('./models/user')

mongoose.Promise = global.Promise


// Create a post and add it to Bobs user record. Log Bob's resulting data.
// Post.create({
//   title: "How to cook the best burger, Part 4",
//   content: "Gibberish"
// }, (err, post) => {
//   User.findOne({email: 'bob@gmail.com'}, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       foundUser.posts.push(post)
//       foundUser.save((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       })
//     }
//   })
// })

// Finds Bob's user record and fully populated post entries. Logs result.
User.findOne({email: 'bob@gmail.com'}).populate('posts').exec((err, user) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
})

// User.create({
//   email: 'bob@gmail.com',
//   name: 'Bob Belcher'
// })
