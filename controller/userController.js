const userModel = require('../models/userModel')
const sendToken = require('../utils/jwtTokenGenerator')
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
                    message: 'Email already registered'
                })
                :
                res.status(400).json({
                    success: false,
                    message: error.message
                })
        }
        sendToken(user, 200, res)
    } catch (error) {
        console.log('Getting error while creating a new user')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// log in a user 
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter an registered email and password"
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
        sendToken(user, 200, res)
    } catch (error) {
        console.log('Getting error while log in a user')
        console.dir(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.logout = (req, res) => {
    const options = {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    const { token } = req.cookies
    if(!token){
        return res.status(400).json({
            success: false,
            message: "User not logged in"
        })
    }
   try {
        res.status(200).cookie('token', null, options).json({
            success: true, 
            message: "Logged out successfully"
        })       
   } catch (error) {
       console.log("Getting error while logout")
       console.dir(error)
       res.status(500).json({
           success: false,
           message:"Internal server error"
       })
   }
}










