var express = require('express')
var router = express.Router({mergeParams: true})

var Campground = require('../models/campground')
var Comment = require('../models/comment')

// Comments new
router.get('/new', isLoggedIn, (req, res) => {
  var id = req.params.id
  Campground.findById(id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground})
    }
  })
})

// Comments create
router.post('/', isLoggedIn, (req, res) => {
  // Lookup campground using id
  var id = req.params.id
  Campground.findById(id, (err, campground) => {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      // Create comment
      var newComment = req.body.comment
      Comment.create(newComment, (err, createdComment) => {
        if (err) {
          console.log(err)
        } else {
          // Add username and id to comment
          createdComment.author.id = req.user._id
          createdComment.author.username = req.user.username
          createdComment.save()
          // Associate comment with campground
          campground.comments.push(createdComment)
          campground.save()
          console.log(createdComment)
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})

// Comments edit route
router.get('/:comment_id/edit', (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err)
      res.redirect('back')
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
    }
  })
})

// Comments update route
router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      console.log(err)
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

// Comments destroy route
router.delete('/:comment_id', (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      console.log(err)
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

// Middleware
// Authentication check function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router
