const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    "id": String,
    "orderNum": String,
    "hospitalName": String,
    "address": String,
    "postinumero": String,
    "location": String,
    "resisdentCode": String,
    "city": String,
    "language": String,
    "organizationId": String,
    "organizationName": String,
    "serviceId": String,
    "service": String,
    "password": {
        type: String,
        required: [true, 'please provide password']
    },
    "role": {
        type: String,
        default: 'hospital'
    }
})

module.exports = mongoose.model('hospital_user', hospitalSchema)

