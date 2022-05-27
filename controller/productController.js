const { findById } = require('../models/productModel')
const productModel = require('../models/productModel')
const ApiFeatures = require('../utils/apiFeatures')
// Creating new products (only for admin)
exports.createProduct = async (req, res) => {
    try {
        req.body.user = req.user.id
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
// Updating a existing product (only for admin)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        let product = await productModel.findById(id).exec()
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        product = await productModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log('Getting error while updating a existing product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Fetching a existing product details
exports.fetchProductDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        let product = await productModel.findById(id).exec()
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log('Getting error while updating a existing product')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Deleting a existing product details (only for admin)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Id not found please enter an id of product'
            })
        }
        let product = await productModel.findById(id).exec()
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        await productModel.findByIdAndRemove(id)
        res.status(200).json({
            success: true,
            message: 'Deleted the product successfully'
        })
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
        const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter().pagination(resultPerPage)
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

// create and update a product reviews
exports.createAndUpdateReviews = async(req, res) => {
    try {
        const { rating, comment, productId } = req.body
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
        if(isReviewed){
            product.reviews.forEach(rev => {
                if(rev.user.toString() === req.user._id.toString()){
                    rev.rating = review.rating
                    rev.comment = review.comment
                }
            })
        }else{
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        let avg = 0
        product.reviews.forEach(rev => avg+=rev.rating )
        product.ratings = avg/product.reviews.length
        await product.save({ validateBeforeSave: false })
        res.status(200).json({
            success: true,
            message: "Review added successfully"
        })
    } catch (error) {
        console.log("Getting error while try to creating or updating the product reviews")
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "Internal server error"
        })
    }
}

// get all reviews of a single product

exports.getReviews = async(req, res)=>{
    try {
        const { productId } = req.query
        console.log(productId)
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    } catch (error) {
        console.log("Getting error while try to fetch all reviews of the product")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// delete product review
exports.deleteReview = async(req, res)=>{
    try {
        const { productId, id } = req.query
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        if(id){
            if(!req.user.role === "admin"){
                return res.status(401).json({
                    success: false,
                    message: "You don't have authorization to access this resource"
                })
            }else{
                const reviews = product.reviews.filter(rev => rev._id.toString() !== id)
                const numOfReviews = reviews.length
                let avg = 0
                reviews.forEach(rev => avg+=Number(rev.rating))
                product.reviews = reviews
                product.numOfReviews = numOfReviews
                product.ratings = avg
                await product.save()
                return res.status(200).json({
                    success: true,
                    message: "Successfully deleted the review"
                })
            }
        }
        const reviews = product.reviews.filter( rev => rev.user.toString() !== req.user._id.toString())
        const numOfReviews = reviews.length
        let avg = 0
        reviews.forEach(rev => avg+=Number(rev.rating))
        product.reviews = reviews
        product.numOfReviews = numOfReviews
        product.ratings = avg
        await product.save()
        res.status(200).json({
            success: true,
            message: "successfully deleted the review"
        })
    } catch (error) {
        console.log("Getting error while try to delete won review")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal serve error"
        })
    }
}

















