var express = require('express')
var app = express()

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('Business happening on ' + PORT)
})
