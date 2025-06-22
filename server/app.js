// 🔒 Load environment variables from a .env file into process.env
// This allows you to securely store things like API keys in a .env file instead of hardcoding them
require('dotenv').config() //needs to be first because we need to load in variables from the .env file into process.ev

// ✅ Import the Express framework — used to create web servers and APIs
const express = require('express')

// 🌐 Import the CORS middleware: Cross-Origin Resource Sharing
// This lets your React frontend (which runs on a different port) talk to your backend API
const cors = require('cors')

// ✅ Import Mongoose to connect to MongoDB; mongoose is the library that connects our node server to mongoDB
const mongoose = require('mongoose')

// ✅ Connect to MongoDB using the URI from your .env file; mongoose connects to our mongoDB atlas cluster with the URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected')) //tells us if the connection succeeds
  .catch((err) => console.error('❌ MongoDB connection error:', err)) //logs an error if connection fails

// 💻 Create an instance of an Express app
const app = express()

// 🔓 Enable CORS so frontend (localhost:3000) can access backend (localhost:5000)
app.use(cors())

// 📦 Middleware to automatically parse incoming JSON in request bodies
// Without this, Express can't read req.body if it's JSON
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// ✅ Set up a test route at the root URL (http://localhost:3000/)
// Just sends back plain text so we know the API is working
app.get('/', (req, res) => {
  res.send('API is running...')
})

// 🌟 Set the port to whatever is in your .env file, or default to 3000
const PORT = process.env.PORT || 3000

// 🚀 Start the server and log that it's running
// This makes your API live at http://localhost:3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
