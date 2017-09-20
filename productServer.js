var express = require('express')
var config = require('./config/index')

var app = express()

var router = express.Router()

router.get('/', function(req, res, next){
  req.url = '/index.html'
  next()
})


var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRoutes = express.Router()
app.use("/api", apiRoutes)

apiRoutes.get("/seller", function(req, res){
  res.json({
    errno : 0,
    data : seller
  })
})

apiRoutes.get("/goods", function(req, res){
  res.json({
    errno : 0,
    data : goods
  })
})

apiRoutes.get("/ratings", function(req, res){
  res.json({
    errno : 0,
    data : ratings
  })
})
app.use(express.static('./dist'))

app.listen(9000)
