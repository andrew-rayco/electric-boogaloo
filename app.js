var express = require('express')
var app = express()

app.set ('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/friends', (req, res) => {
  var friends = ['Tony', 'Brett', 'Micky D', 'Simon', 'Scotty']
  res.render('friends', {friends})
})

const PORT = 3000

app.listen(process.env.PORT || PORT, function() {
  console.log('Server started yo!')
})
