var Campground = require('../models/campground')
var Comment = require('../models/comment')

// Middleware
// Authentication check function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'You need to be logged in to do that')
  res.redirect('/login')
}

// Check campground ownership
function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || foundCampground == undefined) {
        req.flash('error', 'Campground not found')
        return res.redirect('back')
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next()
        } else {
          req.flash('error', 'You don\'t have permission to do that')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('back')
  }
}

// Check comment ownership
function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || foundComment == undefined) {
        console.log(err)
        res.redirect('back')
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next()
        } else {
          req.flash('error', 'You don\'t have permission to do that')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('back')
  }
}

module.exports = {
  isLoggedIn,
  checkCampgroundOwnership,
  checkCommentOwnership
}
