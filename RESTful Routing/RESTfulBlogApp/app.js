var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')

app = express()

mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true})

// app config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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


// NEW route
app.get('/blogs/new', (req, res) => {
  res.render('new')
})


// CREATE route
app.post('/blogs', (req, res) => {
  var blog = req.body.blog
  if (blog.image == '') {
    blog.image = 'http://placehold.it/250x200'
  }
  Blog.create(blog, (err, newBlog) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newBlog);
      res.redirect('/blogs')
    }
  })
})


// SHOW route
app.get('/blogs/:id', (req, res) => {
  var id = req.params.id
  Blog.findById(id, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {blog})
    }
  })
})


// EDIT route
app.get('/blogs/:id/edit', (req, res) => {
  var id = req.params.id
  Blog.findById(id, (err, blogToEdit) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', {blog: blogToEdit})

    }
  })
})


// UPDATE route
app.put('/blogs/:id', (req, res) => {
  var id = req.params.id
  var newData = req.body.blog;
  Blog.findByIdAndUpdate(id, newData, (err, updatedBlog) => {
    if (err) {
      console.log(err);
    } else {
      console.log(updatedBlog);
      res.redirect('/blogs/' + id)
    }
  })
})


// DELETE route
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('successfully deleted!');
      res.redirect('/blogs')
    }
  })
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('server is running on port', PORT);
})
