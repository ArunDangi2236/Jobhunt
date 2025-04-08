const jwt = require("jsonwebtoken")

const isAuthenicated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: "Unauthorized User",
                success: false
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id = decoded.userId;
        next()
    } catch (error) {
        console.log("error from the isAuthenticated middleware:", error)
    }
}

module.exports = isAuthenicated