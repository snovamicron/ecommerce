const express = require('express')
const authJwtToken = require("../middleware/authJwtToken")
const authenticateRoles = require("../middleware/authAccessRoles")
const { createProduct, updateProduct, getProducts, fetchProductDetails, deleteProduct } = require('../controller/productController')
const router = express.Router()
router.route('/product/new').post(authJwtToken,authenticateRoles("admin"),createProduct)
router.route('/product/:id?').put(authJwtToken,authenticateRoles("admin"),updateProduct).get(authJwtToken,authenticateRoles("admin"),fetchProductDetails).delete(authJwtToken,authenticateRoles("admin"),deleteProduct)
router.route('/products').get(getProducts)
module.exports = router