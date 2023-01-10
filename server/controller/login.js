const { client, hospital, admin, key } = require("../ultilities/role")
const user = require('../models/user')
const hospital_user = require('../models/hospital')
const admin_user = require('../models/admin')
const allhospital = require('../models/allhospital')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const generateToken = (id, password, role,) => {
    const accessToken = jwt.sign(
        // 1st factor for token required ==> by object/string/number type
        {
            id,
            password,
            role
        },
        // 2nd factor for token required ==> secret key
        key,
        // 3rd option ==> 
        { expiresIn: '1d' }
    )
    return accessToken
}

const login = asyncHandler(async (req, res, next) => {
    // 1.user login can be admin/patient(client,user....)/hospital_user
    // 2. check it admin/user  vs hospital_user
    // 3. send token with valid for 1day. 
    const { role } = req.body
    if (!role) {
        return res.status(400).json({ msg: 'insert role' })
    }
    // as client
    if (role === client) {
        const { nickname, password } = req.body
        // 1. find user name: 
        let foundUser = await user.findOne({ nickname }).exec()
        if (!foundUser) {
            return res.status(401).json({ msg: 'user not found' })
        }
        // 2. check  password : 
        if (foundUser.password !== password) {
            return res.status(401).json({ msg: 'password not match' })
        }
        let { _id: id } = foundUser
        let token = generateToken(id, password, role)
        return res.status(200).json({ msg: 'login success', token,role })
    }
    // as admin
    if (role === admin) {
        const { nickname, password, } = req.body
        // 1. find user name: 
        let foundUser = await admin_user.findOne({ nickname }).exec()
        if (!foundUser) {
            return res.status(401).json({ msg: 'user not found' })
        }
        // 2. check  password : 
        if (foundUser.password !== password) {
            return res.status(401).json({ msg: 'password not match' })
        }
        let { _id: id } = foundUser
        let token = generateToken(id, password, role)
        return res.status(200).json({ msg: 'login success', token,role })
    }
    // as hospital_user
    if (role === hospital) {
        const { id, password } = req.body
        // 1. find user name: 
        let foundUser = await hospital_user.findOne({ id }).exec()
        if (!foundUser) {
            return res.status(401).json({ msg: 'user not found' })
        }
        // 2. check  password : 
        if (foundUser.password !== password) {
            return res.status(401).json({ msg: 'password not match' })
        }
        if (foundUser) {
            let { _id: id } = foundUser
            let token = generateToken(id, password, role)
            return res.status(200).json({ msg: 'login success', token,role })
        }
    }
    return res.status(404).json({ msg: 'data not found' })
})


module.exports = login