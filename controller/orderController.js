const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
// create new order
exports.newOrder = async (req, res)=>{
    try {
        const { 
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            shippingPrice,
            texPrice,
            totalPrice
        } = req.body
        try {
            const order = await orderModel.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                itemPrice,
                shippingPrice,
                texPrice,
                totalPrice,
                payedAt: Date.now(),
                user: req.user._id
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log("Getting error while try to create a new product")
        console.error(error)
        return res.status(500).json({
            success: false,
            MessageChannel: "Internal server error"
        })
    }
}



// get all my orders
exports.getMyOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({"user": req.user._id})
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log("Getting error while try fetch all my order details")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}




// get single order
exports.getSingleOrder = async(req, res)=>{
    try {
        const order = await orderModel.findById(req.params.id).populate("user", "name email")
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Not found any orders with this id"
            })
        }
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log("Getting error while try fetch a single order details")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

