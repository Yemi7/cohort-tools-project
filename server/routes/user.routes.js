const router = require("express").Router()
const User = require("../models/User.model")
const verifyToken = require("../middleware/auth.middleware")

router.get("/:userId", verifyToken ,async (req, res, next) => {
  console.log(req.params)
  try {
    const response = await User.findById(req.params.userId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})
module.exports = router
