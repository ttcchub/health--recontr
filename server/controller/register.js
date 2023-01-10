const { client, hospital, admin } = require("../ultilities/role")
const user = require('../models/user')
const hospital_user = require('../models/hospital')
const admin_user = require('../models/admin')
const allhospital = require('../models/allhospital')
const booking = require('../models/booking_hospital')
const createListOfTime = require('../ultilities/bookingcreate')
const asyncHandler = require('express-async-handler')
const register = asyncHandler(async (req, res, next) => {
    //1. check role first 
    const { role } = req.body
    if (!role) {
        return res.status(400).json({ msg: 'role not found' })
    }
    let data
    //2. set up new user client vs admin
    if (role === client || role === admin) {
        const { fullname, nickname, password, email } = req.body
        // 2.1 check nickname vs email exist ? and create
        if (role === client) {
            data = await user.findOne({ nickname }).lean() || await user.findOne({ email }).lean()
            if (data) {
                return res.status(401).json({ msg: 'nickname or email have been used' })
            }
            else {
                data = await user.create({ fullname, nickname, password, email })
                return res.status(201).json({ msg: `user ${nickname} have been created`, data })
            }
        }
        // 2.2 check nickname vs email exist ? and create
        if (role === admin) {
            data = await admin_user.findOne({ nickname }).lean() || await admin_user.findOne({ email }).lean()
            if (data) {
                return res.status(401).json({ msg: 'user or password have been used' })
            }
            else {
                data = await admin_user.create({ fullname, nickname, password, email })
                return res.status(201).json({ msg: `user ${nickname} have been created`, data })
            }
        }
    }

    // 3. set up new hospital. 
    if (role === hospital) {
        // 3.1 hospital need only id and password 
        // a. once pwd and id have been provided 
        // b. find on the hospital list data ==> if data of hospital have been found 
        //          b.1 we will send them as comfirm --> and add all the hospital list as our hospital_user
        // b.1.1 find that user already resgister/not ?
        //          b.2 if can not find send msg that hospital id can not be found 
        const { id, password, role } = req.body
        data = await allhospital.find({ id }).lean()
        // check that hospital exits on allhospital systerm
        if (!data.length) {
            return res.status(401).json({ msg: `can not found hospital id : ${id} on our finnish data base` })
        }
        // check that hospital already register in our hospital users 
        let checked = await hospital_user.findOne({ id }).lean()
        if (checked) {
            return res.status(401).json({ msg: `hospital id : ${id} already have been registered` })
        }


        data?.map((item) => {
            item.password = password
            item.role = role
        })
        // set up password for all hospital 
        let newHospitalUser = await hospital_user.create(data)
        // set up booking object for each hospital --> list booking is now create for 7day from the first day register
        let booking_time = createListOfTime()
        newHospitalUser?.map(asyncHandler(async (item, index) => {
            // console.log(item.hospitalName)
            const { _id: id, hospitalName, id: hospitalId } = item
            let bookingCreate = await booking.create({
                "booking_hospital_id": id, hospitalId,
                hospitalName, booking_time
            })

        }))
        if (newHospitalUser) return res.status(201).json({ msg: `hospital id: ${id} have created as hospital_user` })

    }

    return res.status(401).json({ msg: 'fail' })
})




module.exports = register