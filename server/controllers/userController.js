//Controller for the user that handles logic for the requests; takes data in from the client (via request) and interacts with databases and sends back responses
//Middleman between routes and database
const User = require('../models/User') // our MongoDB user model; lets us interact with user data
const bcrypt = require('bcryptjs') // used to hash and verify passwords securely
const jwt = require('jsonwebtoken') //creates JWT tokens for authentication

// 📌 POST /api/users/register -- handles user regsiteration
const registerUser = async (req, res) => {
  //recieves email and password sent from the client in the HTTP request body
  const { email, password } = req.body

  try {
    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) { //if user found, respond with status 400 and a message
      return res.status(400).json({ message: 'User already exists' }) 
    }

    // 🔒 Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) //creates a hashed password so its securely stored

    // ✅ Create new user in MongoDB with the email and hashed password
    const newUser = await User.create({
      email,
      password: hashedPassword,
    })

    // 🪙 Create a JWT token that contains the user's unique ID, that is signed with my secret key and expires in 7 days. This token will be used to authenticate the user in future requests
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
  } catch (error) { //catches any error
    res.status(500).json({ message: 'Server error' })
  }
}

// 📌 POST /api/users/login -- handles user login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // 🔍 Find user
    const user = await User.findOne({ email })
    if (!user) { //if can't find the user, send invalid credential message
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // 🔑 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password) //uses bcrypt to compare the submitted password with the hashed password 
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

//Exports these functions so our route files and import and use them
module.exports = { registerUser, loginUser }
