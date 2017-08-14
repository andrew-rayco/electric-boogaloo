var express = require('express')
var request = require('request')

var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('search')
})

app.get('/results', (req, res) => {
  var query = req.query.search
  var url = 'http://www.omdbapi.com/?s='
  var key = '&apikey=thewdb'
  request(url + query + key, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      res.render('results', {data: data})
    }
  })
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('Movie app has started yoBeans! Check out port', PORT)
})
