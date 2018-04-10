const express = require('express')

const app = express()

const router = express.Router()

var data = require('../data.json')
var goods = data.goods
var ratings = data.ratings
var seller = data.seller

router.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})

router.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
})

app.use('/api', router)
app.use(express.static('dist'))
const port = process.env.port || 8080
app.listen(port, function() {
  console.log(`listening on ${port}`)
})
