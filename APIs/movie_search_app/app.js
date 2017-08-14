var express = require('express')
var request = require('request')

var app = express()

app.set('view engine', 'ejs')

app.get('/results', (req, res) => {
  request('http://www.omdbapi.com/?s=zealand&apikey=thewdb', (error, response, body) => {
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
