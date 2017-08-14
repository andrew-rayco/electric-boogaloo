var express = require('express')
var request = require('request')

var app = express()

app.get('/results', (req, res) => {
  res.send('you found me')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('Movie app has started yoBeans! Check out port', PORT)
})
