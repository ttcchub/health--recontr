const { client, hospital, admin, key } = require("../ultilities/role")
const user = require('../models/user')
const booking_hospital = require('../models/booking_hospital')
const asyncHandler = require('express-async-handler')
// 1.get user profile 

const userProfile = asyncHandler(async (req, res, next) => {
    const { id: _id } = req.body
    const data = await user.findOne({ _id }).exec()
    if (!data) {
        return res.status(401).json({ msg: 'user not found' })
    }
    return res.status(200).json({ msg: 'success', data })
})

// require log out when password success changed
const editProfile = asyncHandler(async (req, res, next) => {
    const { nickname, role, password, email, fullname, pwdToken } = req.body
    let message = ''
    let data = await user.findOne({ nickname }).exec()
    // 1. check that pwdtoken === database token or not 
    // 1.1 make sure that in case user changed password but he still using all token
    // 1.2 user have to login and get new token

    if (password && password !== data.password) {
        data.password = password
        data = await data.save()
        message += '--- user password updated please logout'
    }
    if (email && email !== data.email) {
        let check = await user.findOne({ email }).lean()

        if (!check) {
            data.email = email
            data = await data.save()
            message += '--- user email updated'
        } else {
            message += '-- email have been used'
        }
    }
    if (fullname && fullname !== data.fullname) {
        data.fullname = fullname
        data = await data.save()
        message += '--- user full name updated'
    }

    return res.status(201).json({ msg: `update user ${nickname} updated as ${message.length > 5 ? message : 'nothing '}`, })

})

const setBooking = asyncHandler(async (req, res, next) => {
    const { hospitalId: booking_hospital_id, id: _id
        , nickname, pwdToken, bookingDate, bookingTime, customerNote } = req.body

    // 1. find hospital vs find user information
    let data = await booking_hospital.findOne({ booking_hospital_id }).exec()
    const foundUser = await user.findOne({ _id }).exec()
    let { bookingList } = foundUser
    if (!data) {
        return res.status(401).json({ msg: 'hospital booking not found' })
    }
    // 2. find date and time to fixed
    let { booking_time } = data
    for (let date in booking_time) {
        if (date === bookingDate) {
            booking_time[date].map(list => {
                if (list.time === bookingTime) {
                    // found the time on booking list 
                    // 1. changed it to user confirm
                    list.userConfirm = true
                    list.customerId = _id
                    list.customerNote = customerNote
                    // set to user profile
                    let temp = { ...list }
                    temp.hospitalId = booking_hospital_id
                    temp.customerNote = customerNote
                    temp.hospitalName = data.hospitalName
                    if (Object.keys(bookingList).includes(bookingDate)) {
                        bookingList[bookingDate].push(temp)

                    } else {
                        bookingList[bookingDate] = []
                        bookingList[bookingDate].push(temp)
                    }

                }
            })
        }
    }

    // set update data to hospital booking 
    await data.updateOne({ booking_time })
    await foundUser.updateOne({ bookingList })
    return res.status(200).json({ msg: 'Booking added', bookingList })
})


const editBooking = asyncHandler(async (req, res, next) => {
    const { id: _id, hospitalId: booking_hospital_id, time, customerNote, date } = req.body
    // 1. find user information to fixed on userSchema
    const foundUser = await user.findOne({ _id }).exec()
    // 2. find booking systerm to fixed booking
    const foundBooking = await booking_hospital.findOne({ booking_hospital_id }).exec()
    if (!foundUser || !foundBooking) {
        return res.status(401).json({ msg: "can not found user or hospital booking" })
    }
    if (!Object.keys(foundUser.bookingList).includes(date) || foundUser.bookingList[`${date}`]?.length === 0) {
        return res.status(401).json({ msg: 'if user want to change new date please delete our appointment and booking new ' })
    }
    if (foundUser.bookingList[`${date}`].findIndex(booking => booking.time === time) === -1) {
        return res.status(401).json({ msg: 'if user want to change new date/time please delete our appointment and booking new ' })

    }
    // 3. check that some thing different compare to origin data
    // when user need to update booking 
    // user can change date / time --> we can delete this time table --> call set new booking
    // user can update their note --> we can update note --> 
    let oldNote = ''
    foundUser.bookingList[`${date}`].map(item => {

        if (item.time === time) {
            oldNote = item.customerNote
        }
    })
    // update note 
    if (customerNote !== oldNote) {
        foundBooking.booking_time[`${date}`].map(item => {
            if (item.time === time) {
                item.customerNote = customerNote
            }
        })
        let newdata = foundBooking.booking_time
        await foundBooking.updateOne({ booking_time: newdata })
        foundUser.bookingList[`${date}`].map(item => {
            if (item.time === time) {
                item.customerNote = customerNote
            }
        })
        newdata = foundUser.bookingList
        await foundUser.updateOne({ bookingList: newdata })

        return res.status(200).json({ msg: 'booking edited success', })
    }
    // in order user want to update time/date : 
    return res.status(401).json({ msg: 'nothing to update' })
})

const deleteBooking = asyncHandler(async (req, res, next) => {
    const { id: _id, hospitalId: booking_hospital_id, time, date } = req.body
    // find user vs find hostpital
    let findUser = await user.findOne({ _id }).exec()
    // check that user have correct date vs time on that booking list 
    if (!findUser.bookingList[`${date}`].find(booking => booking.time === time) || !Object.keys(findUser.bookingList).includes(date)) {
        return res.status(401).json({ msg: `you dont have any booking on ${date} at ${time} ` })
    }

    // find hospital
    let findHospital = await booking_hospital.findOne({ booking_hospital_id })
    //  find user's booking time by date/time/booking_hospital_id
    if (!Object.keys(findHospital.booking_time).includes(date)) {
        return res.status(401).json({ msg: 'booking time can not find ' })
    }
    let checkTime = time
    // set up hospital booking
    findHospital.booking_time[`${date}`]?.map(item => {
        let { time, customerId, } = item
        if (time === checkTime && customerId === _id) {
            item.customerId = null
            item.userConfirm = false
            item.customerNote = ''
            item.hospitalNote = ''
            item.userVisitConfirm = false
            item.hospitalConfirm = false
        }
    })


    let newBooking_time = findHospital.booking_time
    let index = findUser.bookingList[`${date}`]?.findIndex(booking => booking.hospitalId === booking_hospital_id && booking.time === time)
    // ?.filter(booking => booking.time !== time)
    findUser.bookingList[`${date}`].splice(index, 1)
    let newBookingList = findUser.bookingList[`${date}`]
    findUser.bookingList[`${date}`] = newBookingList

    const updateBookingHospital = await findHospital.updateOne({ booking_time: newBooking_time })
    const updateBookingUser = await findUser.updateOne(findUser)
    if (!updateBookingHospital || !updateBookingUser) {
        return res.status(404).json({ msg: "error" })
    }

    return res.status(200).json({ ms: `delete success date ${date} with time : ${time}` })
})


module.exports = { userProfile, editProfile, setBooking, editBooking, deleteBooking }