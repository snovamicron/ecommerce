const express = require('express')
const authJwtToken = require('../middleware/authJwtToken')
const authenticateRoles = require('../middleware/authAccessRoles')
const { newOrder, getMyOrders, getSingleOrder, getOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const router = express.Router()
router.route('/user/order').post(authJwtToken,authenticateRoles("user", "admin"),newOrder)
router.route("/user/myOrders").get(authJwtToken,authenticateRoles("admin", "user"),getMyOrders)
router.route("/user/details/order/:id?").get(authJwtToken,authenticateRoles("admin", "user"),getSingleOrder)
router.route('/admin/orders').get(authJwtToken, authenticateRoles("admin"), getOrders)
router.route('/admin/order/:id?').put(authJwtToken, authenticateRoles("admin"), updateOrder).delete(authJwtToken, authenticateRoles("admin"), deleteOrder)


module.exports = router