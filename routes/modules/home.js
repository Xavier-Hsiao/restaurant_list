const express = require('express')
const router = express.Router()
const Resto = require('../../models/resto')

router.get('/', (req, res) => {
  Resto.find() //叫資料庫查找所有餐廳資料
    .lean() ////將 Mongoose物件轉換成 JavaScrript陣列，這樣就不會再有save()之類的 Mongoose方法
    .then(restos => {
      res.render('index', {restos})
    })
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase().split(' ').join('')
  // const regexKeyword = new RegExp('\\w' + keyword + '\\w')
  Resto.find({$or: [{name: keyword}, {category: keyword}]})
    .lean()
    .then(restos => res.render('index', {restos, keyword}))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

module.exports = router