const mongoose =require('mongoose');                        // Database requier mongoose Schema to flow and feed into database
const bcrypt = require('bcrypt');                           // bcrypt is used to Encrylpt the password and credentials
const JWT = require('jsonwebtoken')                         // jsonwebtokes to access user details with valid token

const Usermodel= new mongoose.Schema({                      // User Schema model
    name:{
        type:String,
        required:[true, 'name must be Enter'],
        minLength:[3,'Enter more than 3 characters'],
        maxLength:[15,'Enter less than 15 characters'],
    },
    username:{
        type:String,
        required:[true,'Username Must be Enter'],
        minLength:[3,'Enter more than 3 character'],
        mixLength:[35,'Enter less than 35 character'],
        unique:[true,'Enter the Unquie Username']
    },
    email:{
        type:String,
        required:[true,'Username Must be Enter'],
        minLength:[3,'Enter more than 3 character'],
        mixLength:[35,'Enter less than 35 character'],
        unique:[true,'Enter the Unquie Username']
    },
    password:{
        type:String,
        required:[true,' Password must be Enter']
    },
    bio:{
        type:String,
        required:[true,'Enter Some Bio ']
    }
},{
    timestamps:true
})

// Encrypting the password with bcrypt 
Usermodel.pre("save", async function (next) {
    if (!this.isModified("password")) 
      return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  });
  



  
  //  Genrating the web Tokens from the UserSchema 
  Usermodel.methods = {
    generateAuthToken() {
        return JWT.sign(
            { id: this._id, email: this.email, username: this.username, bio: this.bio },
            process.env.SECRET,
            { expiresIn: '24h' }
        );
    }
};


module.exports=mongoose.model('User',Usermodel);     // exporting the mongoose.model



