const express = require('express')
const app = express()
require('dotenv').config()
const jsend = require('jsend')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const apiPrefix = '/api/v1'
app.use(express.json())
app.use(jsend.middleware)

const indexRouter = require('./routes/index')
const eventsRouter = require('./routes/events')
const usersRouter = require('./routes/users')

app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(apiPrefix + '/', indexRouter)
app.use(apiPrefix + '/events', eventsRouter)
app.use(apiPrefix + '/users', usersRouter)

const initDb = require('./dbConfig/db')
initDb()

app.listen(port, () => console.log(`Listening on port ${port}`))