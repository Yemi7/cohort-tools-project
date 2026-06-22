const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/auth.middleware.js")

// COHORTS
const cohortRouter = require("./cohorts.routes.js")
router.use("/api/cohorts", cohortRouter)

// STUDENTS
const studentRouter = require("./students.routes.js")
router.use("/api/students", studentRouter)
// AUTHENTICATION
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)
// USERS
const userRouter = require("./user.routes")
router.use("/api/users", userRouter)

module.exports = router
