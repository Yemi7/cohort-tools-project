const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth.middleware")

// POST /api/auth/signup route
router.post("/signup", async (req, res, next) => {
  //   console.log(req.body)
  const { email, password, name } = req.body

  if (!email || !password) {
    res
      .status(400)
      .json({ errormessage: "Please enter both email and password" })
    return
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errormessage:
        "Please enter a stronger password. It must contain upper and lower case letters and have at least 8 characters of length",
    })
  }
  try {
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
      res
        .status(400)
        .json({ errormessage: "Sorry, a user has already used that email." })
      return
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = {
      name: name,
      email: email,
      password: hashPassword,
    }

    await User.create(newUser)
    res.status(201).send("user created")
  } catch (error) {
    next(error)
  }
})

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res
      .status(400)
      .json({ errormessage: "Please enter both email and password" })
    return
  }

  try {
    // check if email exists
    const foundUser = await User.findOne({ email: email })
    if (!foundUser) {
      res
        .status(400)
        .json({ errormessage: "No user has signed up with this email." })
      return
    }
    // check if password matches
    const checkPassword = await bcrypt.compare(password, foundUser.password)
    if (!checkPassword) {
      res.status(400).json({ errormessage: "Password Incorrect" })
      return
    }

    //creating tokens
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    })
    console.log(payload)
    res.status(200).json({ authToken: authToken })
  } catch (error) {
    next(error)
  }
})

router.get("/verify", verifyToken, (req, res, next) => {
  res.status(200).json(req.payload)
})

module.exports = router
