var express = require('express')

var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

var PORT = 3000
app.listen(process.env.PORT || PORT, () => {
  console.log('AuthDemo started on port', PORT)
})
