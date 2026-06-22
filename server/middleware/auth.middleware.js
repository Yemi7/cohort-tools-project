const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
  try {
    const authToken = req.headers.authorization.split(" ")[1]
    console.log(authToken);

    const payload = jwt.verify(authToken, process.env.TOKEN_SECRET)

    req.payload = payload
    
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" })
  }
  console.log(req.headers)
}

module.exports = verifyToken
