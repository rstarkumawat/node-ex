const express  = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./user/routes/userRoutes');
const { registerUser } = require('./user/controller/userController');


const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./user/views'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use('/apis/user', userRoutes);

app.get('/',(req, res)=>{
    res.render('index');
})

app.post('/register', registerUser )

app.listen(3000);