const express = require('express')
const { Router } = express
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./src/app/routes')
const consign = require('consign')
const pjson = require('./package.json')

const app = express()

app.use(cors())
app.use(express.json())
// app.use(routes(Router()))
app.set('pjson', pjson)

consign()
  .include('src/app/routes')
  .then('src/app/global/models')
  .then('src/app/global/schemas')
  .then('src/app/global/services')
  .then('src/app/global/utils')
  .then('src/app/controllers')
  .into(app)

mongoose.connect('mongodb://localhost:27017/droplist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log('\nServer start!!\n')
})
