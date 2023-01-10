const express = require("express")
const router = express.Router()
const register = require('../controller/register')
router.route('/')
// create new user that could be hospital/user/admin
.post(require('../controller/register'))


module.exports =router