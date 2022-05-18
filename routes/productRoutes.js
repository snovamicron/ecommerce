const express = require('express')
const { createProduct, updateProduct, getProducts, fetchProductDetails, deleteProduct } = require('../controller/productController')
const router = express.Router()
router.route('/product/new').post(createProduct)
router.route('/product/:id?').put(updateProduct).get(fetchProductDetails).delete(deleteProduct)
router.route('/products').get(getProducts)
module.exports = router