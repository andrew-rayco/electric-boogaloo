// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
})
var Post = mongoose.model('Post', postSchema)
