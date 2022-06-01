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
            res.status(200).json({
                success: true,
                order
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
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


// get all orders (only for admin)
exports.getOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find()
        let totalPrice = 0
        orders.forEach(order => totalPrice+=order.totalPrice)
        res.status(200).json({
            success: true,
            totalPrice,
            orders
        })
    } catch (error) {
        console.log("Getting error while try to fetch all orders details")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// update one order (only for admin)
exports.updateOrder = async(req, res)=>{
    try {
        const order = await orderModel.findById(req.params.id)
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found with this id"
            })
        }
        if(order.orderStatus === "Delivered"){
            return res.status(400).json({
                success: false,
                message: "You have already delivered this order"
            })
        }
        order.orderItems.forEach(async order => await updateStock(order.product, order.quantity))
        order.orderStatus = req.body.status
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now()
        }
        try {
            await order.save({ validateBeforeSave: false })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: "Order updated successfully"
        })
    } catch (error) {
        console.log("Getting error while try to update one order details")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


async function updateStock(id, quantity){
    const product = await productModel.findById(id)
    product.stock-=quantity
    await product.save({ validateBeforeSave: false })
}


// delete any order (only for admin)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Product not found with this id"
            })
        }
        try {
            await order.remove()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: "Order have removed successfully"
        })
    } catch (error) {
        console.log("Getting error while try to remove a order")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}












