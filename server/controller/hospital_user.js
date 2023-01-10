const booking_hospital = require('../models/booking_hospital')
const handlerAsync = require('express-async-handler')
const hospital = require('../models/hospital')
const booking = require('../models/booking_hospital')
const user = require('../models/user')
const booking_list = handlerAsync(async (req, res) => {
    const { id: booking_hospital_id } = req.query
    const data = await booking_hospital.findOne({ booking_hospital_id })
    if (!data) {
        return res.status(401).json({ msg: 'booking id not found' })
    }
    return res.status(200).json({ msg: "success", data })
})

const getHospitalInfo = handlerAsync(async (req, res, next) => {
    const { id: _id, pwdToken: password, role, hospitalId } = req.body

    // 1. find hospital  
    let foundHospitalUser = await hospital.find({ id: hospitalId })
    if (!foundHospitalUser) return res.status(401).json({ msg: 'fail to find hosital data' })
    return res.status(200).json({ msg: 'success', data: foundHospitalUser })
})
const getAllHospitalBooking = handlerAsync(async (req, res, next) => {
    const { hospitalId } = req.body
    let foundBooking = await booking.find({ hospitalId })
    if (foundBooking) return res.status(200).json({ msg: 'succes', data: foundBooking })
    return res.status(401).json({ msg: 'fail' })
})
const editHospitalBooking = handlerAsync(async (req, res, next) => {
    const { hospitalId, bookingEdit } = req.body
    const { customerId, time: bookingTime, date } = bookingEdit



    //1. set get booking once user confirm
    const { bookingId: _id } = req.query
    const foundBookingList = await booking.findOne({ _id: _id })
    foundBookingList.booking_time[`${date}`]?.map((item, index) => {
        // console.log(bookingTime)
        if (item.time === bookingTime) {
            const { hospitalConfirm, userVisitConfirm, hospitalNote } = bookingEdit
            Object.assign(item, {
                hospitalConfirm,
                userVisitConfirm,
                hospitalNote
            })
        }
    })
    // 2.set up customer infor 

    const foundUser = await user.findOne({ _id: customerId })
    foundUser.bookingList[`${date}`]?.map((item, index) => {
        // console.log(bookingTime)
        if (item.time === bookingTime) {
            const { hospitalConfirm, userVisitConfirm, hospitalNote } = bookingEdit
            Object.assign(item, {
                hospitalConfirm,
                userVisitConfirm,
                hospitalNote
            })
        }
    })



    let newBooking_time = foundBookingList.booking_time
    await foundBookingList.updateOne({ booking_time: newBooking_time })
    newBooking_time = foundUser.bookingList
    await foundUser.updateOne({ bookingList: newBooking_time })
    res.status(200).json({ msg: 'edit', newBooking_time })

})


module.exports = { booking_list, getHospitalInfo, editHospitalBooking, getAllHospitalBooking }