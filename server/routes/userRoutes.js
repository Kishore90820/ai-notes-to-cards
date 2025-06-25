//This route defines what code should be run when the server recieves a speciffic request at a specififc URL path
//IMport express and using expresss.Router to create a mini express app just for handling user-related endpoints
const express = require('express')
const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userController') //importing controller functions (registerUser and loginUser) from our controller

// 📝 Route for registering a user
// POST /api/users/register -- when someone sends a post request to /api/users/register express calls registerUser function from the controler
router.post('/register', registerUser)

// 🔐 Route for logging in a user
// POST /api/users/login
router.post('/login', loginUser)

//Exports the router so it can be imported into our main app.js
module.exports = router

//Notes on each hhtp method
    //get -- read datat
    //post -- create new data
    //put --replace existing data
    //patch -- update part of the data
    //delete -- removes data