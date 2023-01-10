const express = require("express")
const router = express.Router()
const login = require('../controller/login')
const loginLimiter = require("../middleware/loginLimiter")
router.route('/')
    .post(loginLimiter, login)

module.exports = router