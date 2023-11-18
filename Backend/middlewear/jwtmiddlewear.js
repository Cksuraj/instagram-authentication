const Usermodel = require("../Model/Usermodel.js");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");

// SignUp DataValidator
exports.SignupDataVailidate = async (req, res, next) => {
  const { name, username, email, password, bio } = req.body;     // all possible check for signup vailidation

  if (!name || !username || !email || !password || !bio) {
    return res.status(400).json({
      success: false,
      message: " Every Field is Requierd",
    });
  }

  const isvailidemail = emailValidator.validate(email);
  if (!isvailidemail) {
    res.status(400).json({
      message: "enter the vailid email",
    });
  }

  const existeduser = await Usermodel.findOne({ email });
  if (existeduser) {
    res.status(400).json({ error: "Email already exists" });
  }

  next();
};

// SignIn DataValiator

exports.SigninDataValidate = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {                                    // All Possibile checks for Signin Validation
    res.status(400).josn({ message: "Enter Both input filed" });
  }

  const user = await Usermodel.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({message:"Encryption is done"});
  }
  next();
};

// Logout Validationg

exports.Logoutvalidate = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).json({
      message: "User is Not Authorised",
    });                                                             
  }

  try {
    const paylode = await JWT.verify(token, process.env.SECRET);
    res.status(200).json({
      message: "The person is Authorised",
      username: paylode.username,
      email: paylode.email,
      bio: paylode.bio
    });
  next();

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `someting went workn : ${error.message}`,
    });
  }
};

