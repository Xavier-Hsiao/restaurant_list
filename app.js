
//將 Express 和其他 package 導入專案
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000

//資料庫連線
const mongoose = require('mongoose')
const { ExpressHandlebars } = require('express-handlebars')

mongoose.connect('mongodb://localhost:27017/restaurant')
  .then(() => {
    console.log('DB connection open!')
  })
  .catch(err => {
    console.log('OH NO ERROR!!!')
    console.log(err)
  })

//設定樣板引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//設定靜態文件
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//設定methodOverride
app.use(methodOverride('_method'))

//載入總路由器
const route = require('./routes/index')
app.use(route)


//監聽通訊阜3000以啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})
