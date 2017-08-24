var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog-demo_2', {useMongoClient: true})

mongoose.Promise = global.Promise

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})
var User = mongoose.model('User', userSchema)

// Post.create({
//   title: "How to cook the best burger, Part 3",
//   content: "asdgfasdfgadsfg adsfgadfg"
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
