const express = require('express')
const router = express.Router()
const alldata = require('../controller/publicdata')
const {booking_list} = require('../controller/hospital_user')
// send all public data

router.route('/hospital_list').get(alldata)
// get booking for each hospital list 
router.route('/hospital_booking').get(booking_list)

module.exports = router




