const sendToken = (user , statusCode, res) => {
    const token = user.getJwtToken()
    // set token on cookie 
    const option = {
        httpOnly:true,
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }
    res.status(statusCode).cookie('token', token, option).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken