const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Missing or invalid token",
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // attach user to request
    req.user = decoded

    next()   // allow request to go to controller
  } 
  catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    })
  }
}

module.exports = authMiddleware
