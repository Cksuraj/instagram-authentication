const Usermodel=require('../Model/Usermodel.js');

///  1St Route Signup // 

exports.Signup= async (req,res,next) =>{
   
    try {
        const userinfo = Usermodel(req.body);
        const user =  await userinfo.save();          // Registering the user on database using async await
     
        res.status(200).json({
            success:true,
            message:"User Registerd successfully",
            data:user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

/// 2nd Route Signin

exports.Signin= async (req,res,next) =>{
    const{username,password}=req.body;

    const user= await Usermodel.findOne({username}).select('+email');

      // Send success response and cookie
      const token = user.generateAuthToken();                       // Singin user on website using token
      res.cookie('token', token, {
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          httpOnly: true
      });
  
      res.status(200).json({
          success: true,
          message: 'Login successful' 
      });  
}

/// 3rd Route Logout

exports.Logout = async (req, res) => {
    try {
        await res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        })                                                    // User logout 
    }
    catch(e) {
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


