const express = require('express')
const { Router } = express
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes(Router()))

mongoose.connect('mongodb://localhost:27017/droplist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log('\nServer start!!\n')
})
