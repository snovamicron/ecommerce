const JWT = require('jsonwebtoken')
exports.authTokenMatch = (req, res, next) => {
   try {
       const token = req.header('token')
       if(!token){
           return res.status(400).json({
               success:false,
               message:"Please enter a token"
           })
       }
       const { id } = JWT.verify(token, process.env.JWT_SECRET)
       req.body.id = id
       next()
   } catch (error) {
       res.status(401).json({
           success:false,
           message:error.message
       })
   }
}
