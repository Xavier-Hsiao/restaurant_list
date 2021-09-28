//9/28--> 利用靜態資料渲染index的餐廳頁面
//9/28--> 打造show頁面的路由和畫面
//9/28--> 設定搜尋功能(query string)

//將 Express 和其他 package 導入專案
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restoList = require('./restaurant.json')

//設定伺服器相關變數
const port = 3000

//設定樣板引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//設定靜態文件
app.use(express.static('public'))

//路由
app.get('/', (req, res) => {
  res.render('index', {restos: restoList.results})
})

app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params)
  const resto = restoList.results.find(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', {resto})
})

app.get('/search', (req, res) => {
  // console.log(req.query)
  const keyword = req.query.keyword.toLocaleLowerCase().split(' ').join('')
  console.log(keyword)
  const restos = restoList.results.filter(resto => resto.name.toLocaleLowerCase().includes(keyword) || resto.category.toLocaleLowerCase().toLocaleLowerCase().includes(keyword))
  res.render('index', {restos, keyword})
})

//監聽通訊阜3000以啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})
