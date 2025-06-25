// server/middleware/authMiddleware.js
//Middleware function thatc hecks if user has a valid token; decodes that token, and finds the associated user in the database and attaches that user's info to the request
//Will be used on routes that require the user to be logged in
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Defines middleware function called protect that recieves req,res, and next
const protect = async (req, res, next) => {
  try {
    // 🪙 Get token from Authorization header; should be in format of Authoirzation: Bearer <token> so. we split by space and split(" ") splits ["Bearer", "token"]
    const token = req.headers.authorization?.split(' ')[1];

    //If no token, then send message of no token
    if (!token) {
      return res.status(401).json({ message: 'No token. Authorization denied.' });
    }

    // ✅ Verify the token and decode it; if not verified, we go to catch block
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //what's stored in the token is the id
    //we return something like:
    /*
    {
        id: '685797cae326c6aff278cbe5', // user._id
        iat: 1750570955,               // issued at (timestamp)
        exp: 1751175755                // expiration time
    }
    */

    // 🧑‍💻 Find the user by decoded id (from the token) and attach to request
    req.user = await User.findById(decoded.id).select('-password'); // we exclude password for safety; also this is attaching user object to the request so now the rest of our app knows which user made the request

    next(); // 🔁 Continue to the actual route handler
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

module.exports = protect;
