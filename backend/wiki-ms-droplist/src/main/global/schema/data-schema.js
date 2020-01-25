const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
  data: Object
}, { collection: 'data' })

module.exports = mongoose.model('Data', DataSchema)
