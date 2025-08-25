
const User = require('../model/userModel');
const joi = require('joi');


const userValidation = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(5).required(),
    address: joi.string().min(5).required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).required()  
});

exports.registerUser = async (req, res)=>{
    const {error} = userValidation.validate(req.body.phone);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
        message: "User Registered Succesfully",
        user: newUser
    });
};