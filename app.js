
//將 Express 和其他 package 導入專案
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Resto = require('./models/resto')

//設定伺服器相關變數
const port = 3000

//資料庫連線
const mongoose = require('mongoose')

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

//首頁路由
app.get('/', (req, res) => {
  Resto.find() //叫資料庫查找所有餐廳資料
    .lean() ////將 Mongoose物件轉換成 JavaScrript陣列，這樣就不會再有save()之類的 Mongoose方法
    .then(restos => {
      res.render('index', {restos})
    })
    .catch(err => console.log(err)) 
})

//新增餐廳表單路由
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//餐廳新增路由
app.post('/restaurants/new', (req, res) => {
  // console.log(req.body)
  const {
    name, category, image, location, phone, google_map, rating, description
  } = req.body

  Resto.create({
    name, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//餐廳介紹路由
app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params)
  const id = req.params.id
  Resto.findById(id)
    .lean()
    .then(resto => res.render('show', {resto}))
    .catch(err => console.log(err))
})

//取得編輯餐廳路由
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Resto.findById(id)
    .lean()
    .then(resto => res.render('edit', {resto}))
    .catch(err => console.log(err))
})

//編輯餐廳內容路由
app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Resto.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

//餐廳搜尋路由
app.get('/search', (req, res) => {
  // console.log(req.query)
  const keyword = req.query.keyword.toLocaleLowerCase().split(' ').join('')
  // console.log(keyword)
  const restos = 
  const restos = restoList.results.filter(resto => resto.name.toLocaleLowerCase().includes(keyword) || resto.category.toLocaleLowerCase().includes(keyword))
  res.render('index', {restos, keyword})
})

//刪除餐廳路由
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Resto.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


//監聽通訊阜3000以啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})
