const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Import routes
let apiRoutes = require('./api/api-routes')
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors())
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/novalabs',
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true })

const db = mongoose.connection

// Added check for DB connection

if (!db)
  console.log('Error connecting db')
else
  console.log('Db connected successfully')

// Setup server port
var port = process.env.PORT || 8000

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))

// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running backend on port ' + port)
})
