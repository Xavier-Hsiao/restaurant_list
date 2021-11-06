const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restos = require('./modules/restos')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
router.use('/restaurants', restos)


module.exports = router