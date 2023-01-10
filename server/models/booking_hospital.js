const mongoose = require('mongoose')

const hospital_booking_schema = new mongoose.Schema({
    "booking_hospital_id": {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'hospital_users'
    },
    hospitalName: {
        type: String,
        require: true
    },
    hospitalId: {
        type: String,
        require: true
    },
    booking_time: {
        type: Object,
    }

})

module.exports = mongoose.model('hospital_booking', hospital_booking_schema)

// 1. so idea get hospital id and set to this booking_hospital_id 
// 2. set booking_time on 7 days 
// 3. when hospital_user register to systerm --> it all auto set up. 
// 4. each user when register they will have list of their hospital booking which is empty
// 5. once client book new booking --> this booking will make in hospital list vs add to user client. 