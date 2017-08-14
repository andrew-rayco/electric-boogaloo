var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set ('view engine', 'ejs')

var friends = ['Tony', 'Brett', 'Micky D', 'Simon', 'Scotty']

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/addfriend', (req, res) => {
  var newfriend = req.body.newFriend
  friends.push(newfriend)
  res.redirect('/friends')
})

app.get('/friends', (req, res) => {
  res.render('friends', {friends})
})

const PORT = 3000

app.listen(process.env.PORT || PORT, function() {
  console.log('Server started yo!')
})
