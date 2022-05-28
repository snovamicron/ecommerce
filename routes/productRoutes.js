const express = require('express')
const authJwtToken = require("../middleware/authJwtToken")
const authenticateRoles = require("../middleware/authAccessRoles")
const { createProduct, updateProduct, getProducts, fetchProductDetails, deleteProduct, createAndUpdateReview, getReviews, deleteReview } = require('../controller/productController')
const router = express.Router()
router.route('/admin/product/new').post(authJwtToken,authenticateRoles("admin"),createProduct)
router.route('/admin/product/:id?').put(authJwtToken,authenticateRoles("admin"),updateProduct).delete(authJwtToken,authenticateRoles("admin"),deleteProduct)
router.route('/product/:id?').get(fetchProductDetails)
router.route('/products').get(getProducts)
router.route('/user/review').put(authJwtToken, authenticateRoles("admin", "user"), createAndUpdateReview)
router.route('/reviews').get(getReviews).delete(authJwtToken,deleteReview)
module.exports = router