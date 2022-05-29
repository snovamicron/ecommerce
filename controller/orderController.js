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

