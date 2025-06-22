const express = require('express')
const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userController')

// 📝 Route for registering a user
// POST /api/users/register
router.post('/register', registerUser)

// 🔐 Route for logging in a user
// POST /api/users/login
router.post('/login', loginUser)

module.exports = router
