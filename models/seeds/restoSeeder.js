const mongoose = require('mongoose')
const Resto = require('../resto') //載入 resto model
const dummyData = require('../../restaurant.json') //載入static JSON file當作種子資料

mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connection open!')
    
    dummyData.results.forEach(resto => {
      //運用解構賦值產生單筆餐廳資料內容
      const {
        name, category, image, location, phone, google_map, rating, description
      } = resto
      //透過 model在資料庫中新增資料記錄
      Resto.create({
        name, category, image, location, phone, google_map, rating, description
      })
    })

    console.log('Seeder completed the mission!')
  })
  .catch(err => {
    console.log('OH NO ERROR!!!')
    console.log(err)
  })
  .finally(() => process.exit(0))