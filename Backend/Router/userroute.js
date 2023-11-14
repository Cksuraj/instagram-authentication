const express =require('express');                     // Routing requiers express to perform routing on server.
const {Signin, Signup, Logout }=require('../Controller/usercontroller.js')      // controllers that uses to check and validitions
const { SigninDataValidate, SignupDataVailidate, Logoutvalidate} = require('../middlewear/jwtmiddlewear.js');  // middlewear to check all possible validations

const authroute=express.Router();                                

authroute.post('/Signup',SignupDataVailidate, Signup);       //Routs with diffrent mathods post, get, delete, put, etc..
authroute.post('/Signin',SigninDataValidate, Signin);
authroute.get('/Logout', Logoutvalidate,Logout);
authroute.get('/check-auth',Logoutvalidate);


module.exports=authroute;
