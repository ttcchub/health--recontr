require('dotenv').config()
const express = require('express')
const app = express()
const handlerAsync = require("express-async-handler")
const defaultHanlder = require('./middleware/errorHandler')
const hospitaluser = require('./models/hospital')
const find = require('./test')
// import connect db vs call connetDB fn ==> to connect to our data base
const connectDB = require('./config/dbConnect')
const mongoose = require("mongoose")
connectDB()
const path = require('path')
const PORT = process.env.PORT || 4000
app.use(express.json())
// set up cor : 
const cors = require('cors')
app.use(cors())
// send all hospital data from begining
app.use('/hospital_data', require('./routes/data'))

// login 
app.use('/login', require("./routes/login"))
// register 
app.use('/register', require("./routes/register"))
// user router
app.use('/user',require('./routes/user'))
app.use('/hospital_user',require("./routes/hospital"))
app.all('*', (req, res) => {
  res.status(404).send('not found')
})

app.use(defaultHanlder)
mongoose.connection.once('open', () => {
  console.log('connect db')
  app.listen(PORT, () => {
    console.log(`listening on ${PORT} ...`)
  })
})
mongoose.connection.on('error', err => {
  console.log(err)
})

