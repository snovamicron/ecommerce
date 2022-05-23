const express = require('express')
const { registerUser, loginUser, logout } = require('../controller/userController')
const router = express.Router()
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logout)
module.exports = router