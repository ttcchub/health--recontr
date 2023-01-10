const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please provide user name']
    },
    nickname: {
        type: String,
        required: [true, 'please provide nick name']
    }, role: {
        type: String,
        default: 'client'
    }
    , password: {
        type: String,
        required: [true, 'please provide password']
    },
    email: {
        type: String,
        required: [true, 'please provide email']
    },
    bookingList: {
        type: Object,
        default: {
            'day': [{
                time: '',
                hospitalId: null,
                userConfirm: false,
                hospitalConfirm: false,
                userVisitConfirm: false,
                customerNote: '',
                hospitalNote: '',
                hospitalName: ''
            }]
        }
    }
})


module.exports = mongoose.model('user', userSchema)