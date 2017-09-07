const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('ok')
})

app.listen(6666, function () {
  console.log('Example app listening on port 6666!')
})
