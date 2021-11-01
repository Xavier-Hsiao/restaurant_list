const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commonType = {
  type: String,
  required: true
}

const restoSchema = new Schema({
  name: commonType,
  phone: commonType,
  category: commonType,
  location: commonType,
  rating: Number,
  image: commonType,
  description: commonType,
  google_map: String,
})

module.exports = mongoose.model('Resto', restoSchema);