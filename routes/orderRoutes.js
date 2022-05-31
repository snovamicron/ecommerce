const express = require('express')
const authJwtToken = require('../middleware/authJwtToken')
const authenticateRoles = require('../middleware/authAccessRoles')
const { newOrder, getMyOrders, getSingleOrder } = require('../controller/orderController')
const router = express.Router()
router.route('/user/order').post(authJwtToken,authenticateRoles("user", "admin"),newOrder)
router.route("/user/myOrders").get(authJwtToken,authenticateRoles("admin", "user"),getMyOrders)
router.route("/user/details/order/:id?").get(authJwtToken,authenticateRoles("admin", "user"),getSingleOrder)


module.exports = router