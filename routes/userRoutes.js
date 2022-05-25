const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword } = require('../controller/userController')
const authJwtToken = require('../middleware/authJwtToken')
const authenticateRoles = require('../middleware/authAccessRoles')
const router = express.Router()
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logout)
router.route('/user/password/forgot').post(forgotPassword)
router.route("/user/password/reset/:token?").put(resetPassword)
router.route('/user/details').get(authJwtToken, authenticateRoles('user', 'admin'),getUserDetails)
router.route('/user/update/password').put(authJwtToken, authenticateRoles('user', 'admin'), updateUserPassword)
module.exports = router