const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
  data: Object
}, { collection: 'details' })

module.exports = function () {
  return mongoose.model('Details', DetailsSchema)
}
