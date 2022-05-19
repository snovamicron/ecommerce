const productModel = require('../models/productModel')
const ApiFeatures = require('../utils/apifeatures')
// Creating new products
exports.createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log('Getting error while creating a new product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Updating a exsiting product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        if (id) {
            let product = await productModel.findById(id).exec()
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            if (product) {
                product = await productModel.findByIdAndUpdate(id, req.body, { new: true, runValidators:true })
                res.status(200).json({
                    success: true,
                    product
                })
            }
        }
    } catch (error) {
        console.log('Getting error while updating a exsiting product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Fetching a exsiting product details
exports.fetchProductDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        if (id) {
            let product = await productModel.findById(id).exec()
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            if (product) {
                res.status(200).json({
                    success: true,
                    product
                })
            }
        }
    } catch (error) {
        console.log('Getting error while updating a exsiting product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Deleteing a exsiting product details
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        if (id) {
            let product = await productModel.findById(id).exec()
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            if (product) {
                 await productModel.findByIdAndRemove(id)
                res.status(200).json({
                    success: true,
                    message: 'Deleted the product successfully'
                })
            }
        }
    } catch (error) {
        console.log('Getting error while updating a exsiting product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Fetching all products
exports.getProducts = async (req, res) => {
    try {
        const resultPerPage = 7
        const apiFeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage)
        const products = await apiFeatures.query
        const productsCount = await productModel.countDocuments()
        res.status(200).json({
            success: true,
            products,
            productsCount
        })
    } catch (error) {
        console.log('Getting error while fetching all products')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}