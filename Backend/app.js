
//  All the dependanciese required by developer

const mongodb =require('./dbconfig/database.js');
const express = require('express');
const authRoute=require('./Router/userroute.js');
const cookieParser =require('cookie-parser');
const cors = require('cors');
const app =express();  

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(cors({origin:[process.env.CLIENT_SIDE_URL], credentials:true}));   

app.use('/api/auth', authRoute);

mongodb();
app.use('/',(req, res)=>{
    return res.status(200).json({                              // Ones Server Up it Response  
        success:true,
        message:'Server is Up and Running Well'
    })
})

module.exports=app;