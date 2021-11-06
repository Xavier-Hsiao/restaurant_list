const express = require('express')
const router = express.Router()
const Resto = require('../../models/resto')

//新增餐廳表單路由
router.get('/new', (req, res) => {
  res.render('new')
})

//餐廳新增路由
router.post('/new', (req, res) => {
  // console.log(req.body)
  const {
    name, category, image, location, phone, google_map, rating, description
  } = req.body

  Resto.create({
    name, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

//餐廳介紹路由
router.get('/:id', (req, res) => {
  // console.log(req.params)
  const id = req.params.id
  Resto.findById(id)
    .lean()
    .then(resto => res.render('show', {resto}))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

//取得編輯餐廳路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Resto.findById(id)
    .lean()
    .then(resto => res.render('edit', {resto}))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    })
})

//編輯餐廳內容路由
router.put('/:id', (req, res) => {
  const id = req.params.id
  Resto.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

//餐廳搜尋路由


//刪除餐廳路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Resto.findById(id)
    .then(resto => resto.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(('error', {status: 500, error: err.message}))
    }) 
})

module.exports = router