const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
  data: Object
}, { collection: 'data' })

module.exports = function () {
  return mongoose.model('Data', DataSchema)
}
