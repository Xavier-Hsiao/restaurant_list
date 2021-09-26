//將 Express 和其他 package 導入專案
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//設定伺服器相關變數
const port = 3000

//設定樣板引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//設定靜態文件
app.use(express.static('public'))

//路由
app.get('/', (req, res) => {
  res.render('index')
})

//監聽通訊阜3000以啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})
