const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please provide user name']
    },
    nickname: {
        type: String,
        required: [true, 'please provide nick name']
    }, role: {
        type: String,
        default: 'admin'
    }
    , password: {
        type: String,
        required: [true, 'please provide password']
    },
    email: {
        type: String,
        required: [true, 'please provide email']
    }
})


module.exports = mongoose.model('admin', adminSchema)