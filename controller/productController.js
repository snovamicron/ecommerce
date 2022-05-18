const productModel = require('../models/productModel')
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
            message: 'Internal server error'
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
                product = await productModel.findByIdAndUpdate(id, req.body, { new: true })
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
            message: 'Internal server error'
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
            message: 'Internal server error'
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
            message: 'Internal server error'
        })
    }
}
// Fetching all products
exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log('Getting error while fetching all products')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}