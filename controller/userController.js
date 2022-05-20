const  userModel = require('../models/userModel')
// Register a new user
exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const avatar = {
            public_id:'sample public_id',
            url:"avatar url"
        }
        const user = await userModel.create({
            name, email, password, avatar
        })
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log('Getting error while creating a new user details')
        console.dir(error.message)
        error.code===11000?
        res.status(400).json({
            success:false,
            message:'Email already registerd'
        })
        :
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}