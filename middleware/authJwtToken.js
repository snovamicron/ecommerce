const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const authJwtToken = async (req, res, next) =>  {
    try {
        const { token } = req.cookies
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Unauthorized credentials"
            })
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decodedData.id) 
        next()
    } catch (error) {
        console.log("Getting error while authenticating jwt token")
        console.dir(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

module.exports = authJwtToken