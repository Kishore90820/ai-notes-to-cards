const mongoose = require("mongoose");

//Define the User schema, setting up the structure of "User" in MongoDB
const userSchema = new mongoose.Schema({
    email: {
        type: String,  //email must be a string
        required: true, //It is required, can't be null or missing
        unique: true //no two users can have the same email
    },
    password: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true //Automatically adds createdAt and updatedAt
})

//Export the User model so we can use it elsewhere in our app; makes a new collection called users in mongodb
module.exports = mongoose.model("User", userSchema);