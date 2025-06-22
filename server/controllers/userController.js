const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 📌 POST /api/users/register
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // 🔒 Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // ✅ Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    })

    // 🪙 Create a JWT
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 📤 Send back token and user info
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// 📌 POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // 🔍 Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // 🔑 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // 🪙 Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 📤 Send back user info + token
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { registerUser, loginUser }
