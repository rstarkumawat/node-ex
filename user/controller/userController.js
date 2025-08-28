
const usermodel = require('../model/userModel');
const joi = require('joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userValidation = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(5).required(),
    address: joi.string().min(5).required(),
    password: joi.string().min(4).required(),
    
});

exports.registerUser = async (req, res)=>{
    const {error} = userValidation.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    let { name, email, address, password} = req.body; 

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            
        let createduser =  await usermodel.create({

            name,
            email,
            address,
            password: hash,
          

        })

            let token = jwt.sign({email}, "Mobile");
            res
            .cookie("token",token)
            .status(201)
            .json({
                message: "User Registered Successfully",
                user: createduser
            });
        })   
            
    })   
};


exports.loginUser = async (req, res)=>{
    let user = await usermodel.findOne({email: req.body.email});
    console.log(user); 

   console.log(user.password, req.body.password);
   bcrypt.compare(req.body.password, user.password, function (err, result){
    console.log(result);

    if(result){

        let token = jwt.sign({email: user.email}, "Mobile");
        res.cookie("token", token);
        res.send("yes yo can login");  


    } else res.send("Semothing is wrong"); 
   })
   
      
}



    
