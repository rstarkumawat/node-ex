const express  = require('express');
const mongoose = require('mongoose');
const usermodel = require("./user/model/userModel")
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRoutes = require('./user/routes/userRoutes');
const { registerUser, loginUser } = require('./user/controller/userController');


const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./user/views'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use('/apis/user', userRoutes);

app.get('/',(req, res)=>{
    res.render('index');
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post('/register', registerUser )


app.post('/login', loginUser);

app.listen(3000);