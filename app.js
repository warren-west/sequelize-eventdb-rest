const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
const apiPrefix = '/api/v1'
app.use(express.json())

const indexRouter = require('./routes/index')
const eventsRouter = require('./routes/events')

app.use(apiPrefix + '/', indexRouter)
app.use(apiPrefix + '/events', eventsRouter)

const initDb = require('./dbConfig/db')
initDb()

app.listen(port, () => console.log(`Listening on port ${port}`))