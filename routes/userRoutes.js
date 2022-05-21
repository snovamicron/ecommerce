const express = require('express')
const { registerUser, singinUser, fetchUser } = require('../controller/userController')
const { authTokenMatch } = require('../middleware/userMiddleware')
const router = express.Router()
router.route('/user/register').post(registerUser)
router.route('/user/singin').post(singinUser)
router.route('/user').get(authTokenMatch, fetchUser)
module.exports = router