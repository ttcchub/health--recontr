const jwt = require("jsonwebtoken")
const { key } = require('../ultilities/role')
require('dotenv').config()
const verifyJWT = (req, res, next) => {
    // get reconigze authorization. 
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Unauthorized" })
    }
    const token = authHeader.split(' ')[1]
    // check token
    jwt.verify(
        token,
        key,
        (err, decoded) => {
            if (err) return res.status(403).json({ msg: 'Forbidden' })
            req.body.id = decoded.id
            req.body.pwdToken = decoded.password
            req.body.role = decoded.role
            next()
        }
    )
}


module.exports = verifyJWT