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
  const keyword = req.query.keyword.toLowerCase().split(' ').join('')
  // console.log(req.query.sort)
  const sortCondition = req.query.sort
  const sortOption = {}

  switch(sortCondition) {
    case 'ascend':
      sortOption['name'] = 'asc'
      break
    case 'descend':
      sortOption['name'] = 'desc'
      break
    case 'category':
      sortOption['category'] = 'asc'
      break
    case 'location':
      sortOption['location'] = 'asc'
    default:
      sortOption['name'] = 'asc'
  }

  Resto.find()
    .lean()
    .sort(sortOption)
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restos: restaurants, keyword: keyword })
    })
    // .then(() => console.log(sortOption))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

module.exports = router