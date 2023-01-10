require('dotenv').config()
const express = require('express')
const app = express()

const defaultHanlder = require('./middleware/errorHandler')
// import connect db vs call connetDB fn ==> to connect to our data base
const connectDB = require('./config/dbConnect')
const mongoose = require("mongoose")
connectDB()

const path = require('path')
const PORT = process.env.PORT || 4000
app.use(express.json())
// send all hospital data from begining
app.use('/', require('./routes/data'))


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