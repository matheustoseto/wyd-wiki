const express = require('express')
const { Router } = express
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes(Router()))

app.listen(3000, () => {
  console.log('\nServer start!!\n')
})
