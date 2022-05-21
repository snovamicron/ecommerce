const userModel = require('../models/userModel')
// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const avatar = {
            public_id: 'sample public_id',
            url: "avatar url"
        }
        let user
        try {
            user = await userModel.create({
                name, email, password, avatar
            })
        } catch (error) {
           return error.code === 11000 ?
                res.status(400).json({
                    success: false,
                    message: 'Email already registerd'
                })
                :
                res.status(400).json({
                    success: false,
                    message: error.message
                })
        }
        const token = user.getJwtToken()
        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        console.log('Getting error while creating a new user')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: "Internal servre error"
        })
    }
}
// Signin a user 
exports.singinUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter an registred email and password"
            })
        }
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password or email'
            })
        }
        const isPasswordMatched = await user.matchPassword(password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password or email'
            })
        }
        const token = user.getJwtToken()
        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        console.log('Getting error while singing in a user')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: "Internal servre error"
        })
    }
}
// fatching a user details
exports.fetchUser = async (req, res)=>{
    try {
        const { id } = req.body
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log('Getting error while fatching a user details')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: "Internal servre error"
        })
    }
}