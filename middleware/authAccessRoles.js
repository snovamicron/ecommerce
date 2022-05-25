

const authenticateRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: `Role: ${req.user.role} is not allowed to access this rescuers`
            })
        }
        next()
    }
}

module.exports = authenticateRoles



