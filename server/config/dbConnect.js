const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://react:12345@cluster0.i6tc1tf.mongodb.net/?retryWrites=true&w=majority', {
            // userNewUrlParser: true,
            // where to locate database from clust
            dbName: 'hospital',
            // userFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('connect db success ...')
    } catch (err) {
        console.log('connect DB fail....')
        logEvents(`error : ${err.hostname}\t${err.code}\t${err.syscall}\t`, 'mongoErr.log')

    }
}

module.exports = connectDB