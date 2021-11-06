
//將 Express 和其他 package 導入專案
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { ExpressHandlebars } = require('express-handlebars')
const port = 3000

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

//引用 mongoose.js
require('./config/mongoose')

//監聽通訊阜3000以啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})
