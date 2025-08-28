const { string } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/devlop');

const userSchema = mongoose.Schema({
    name : String,
    email: String,
    address : String,
    password: String,
})

module.exports = mongoose.model("User", userSchema);