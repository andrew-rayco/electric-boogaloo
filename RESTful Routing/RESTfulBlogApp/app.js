var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app = express()

mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true})

// app config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

// Mongoose model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: {type: String, default: 'http://placehold.it/300x200'},
  body: String,
  created: {type: Date, default: Date.now}
})

var Blog = mongoose.model('Blog', blogSchema)

// Blog.create({
//   title: "Test Blog",
//   image: "http://placehold.it/500x350",
//   body: "Hello this is a blog post"
// })

// RESTful routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogs: blogs})
    }
  })
})




var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('server is running on port', PORT);
})
