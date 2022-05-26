const crypto = require("crypto")
const { is } = require("express/lib/request")
const { json } = require("express/lib/response")
const res = require('express/lib/response')
const { findByIdAndUpdate, findOne } = require("../models/userModel")
const userModel = require('../models/userModel')
const sendToken = require('../utils/jwtTokenGenerator')
const sendMail = require('../utils/resetPasswordMail')
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

// logout a user
exports.logout = (req, res) => {
    const options = {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    const { token } = req.cookies
    if (!token) {
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
            message: "Internal server error"
        })
    }
}

// forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const resetToken = user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`
        const message = `To reset your password click this link:${resetPasswordUrl}\n\nIf you have not requested this mail then please ignore it`
        try {
            await sendMail({
                email,
                subject: "E-Commerce password recovery",
                message
            })
            res.status(200).json({
                success: true,
                message: `check the email ${email} we send the reset password to this mail address`
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    } catch (error) {
        console.log("Getting error while try to send reset password mail")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword, confirmPassword } = req.body
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset password token invalid or has been expired"
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password dose not match"
            })
        }
        try {
            user.password = newPassword
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: "Password has changed successfully"
        })
    } catch (error) {
        console.log("Getting error while try to reset password")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// get user details
exports.getUserDetails = async (req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.user._id})
        res.status(200).json({
            success: true, 
            user
        })
    } catch (error) {
        console.log("Getting error while fetching user details")
        console.error(error)
        return res.status(500).json({
            success: false, 
            message: "Internal error"
        })
    }
}


// update user password
exports.updateUserPassword = async(req, res)=>{
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please enter old password and the new password"
            })
        }
        const user = await userModel.findOne({_id: req.user._id}).select("+password")
        const isPasswordMatched = await user.matchPassword(oldPassword)
        if(!isPasswordMatched){
            return res.status(400).json({
                success: false,
                message: "Invalid old password"
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password dose not match"
            })
        }
        try {
            user.password = newPassword
            await user.save()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })           
        }
        const options = {
            httpOnly: true,
            expires: new Date(Date.now())
        }
        res.status(200).cookie('token', null, options).json({
            success: true,
            message: "Password updated successfully please log in with new password"
        })
    } catch (error) {
      console.log("Getting error while updating user password")
      console.error(error)
      return res.status(500).json({
          success: false, 
          message: "Internal server error"
      })   
    }
}

// update user profile
exports.updateProfile = async(req, res)=>{
    try {
        const { name, email } = req.body
        let user
        // we will add cloudinary later
        try {
             user = await userModel.findByIdAndUpdate(req.user._id,{ name, email }, {
                new:true,
                runValidators:true
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        })
    } catch (error) {
        console.log("Getting error while try to update profile")
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// fetch all user details (only for admin)
exports.fetchAllUserDetails = async(req, res)=>{
    try {
        const users = await userModel.find({role:"user"})
        const usersCount = await userModel.find({role: 'user'}).countDocuments()
        res.status(200).json({
            success: true,
            usersCount,
            users
        })
    } catch (error) {
        console.log("Getting error while try to fetching all user details");
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// fetch one particular user details (only for admin)
exports.fetchOneUserDetails = async(req, res)=>{
    try {
        const { userId } = req.params
        const user = await userModel.findById(userId) 
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        } 
        res.status(200).json({
            success: true,
            user
        })      
    } catch (error) {
        console.log("Getting error while try to fetch one particular user details")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// update user role (only for admin)
exports.updateUserRole = async (req, res)=> {
    try {
        const { email, name, role } = req.body
        const { userId } = req.params
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
        })
        }
        try {
            user.email = email,
            user.name = name,
            user.role = role
            await user.save()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Getting error while updating the role of a user")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//Delete user (only for admin)
exports.deleteUser = async(req, res)=>{
    try {
        const { userId } = req.params
        const user = await userModel.findById(userId)
        // we will remove cloudinary later
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        try {
            await user.remove()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log("Getting error while try to delete a user")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
























