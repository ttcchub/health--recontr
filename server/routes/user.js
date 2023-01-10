const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const requestLogin = require('../middleware/requestLogin')
const { userProfile, editProfile, setBooking, editBooking, deleteBooking } = require('../controller/user')
router.use(verifyJWT,requestLogin)

router.route('/')
    // get profile information
    .get(userProfile)
    // edit profile 
    .patch(editProfile)

router.route('/booking')
    // create booking 
    .post(setBooking)
    // edit booking
    .patch(editBooking)
    // delete booking
    .delete(deleteBooking)

module.exports = router