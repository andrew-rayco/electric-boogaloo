var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog-demo', {useMongoClient: true})

mongoose.Promise = global.Promise

// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
})
var Post = mongoose.model('Post', postSchema)

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
})
var User = mongoose.model('User', userSchema)


// var newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// })
// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding, go to potions class"
// })
//
// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// })

// var newPost = new Post({
//   title: "Reflections on apples",
//   content: "They are delicious"
// })
// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// })

User.findOne({name: "Hermione Granger"}, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "Three things I really hate",
      content: "Voldemort. Voldemort. Voldemort"
    })
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    })
  }
})
