import userModel from "../Model/userModel.js"
import {
  validateRegister,
  sendMail,
  validateLoginUser,
  createToken
} from "../helpers/authHelpers.js"
import passport from 'passport';
import '../auth/localStrategy.js'
import jwt from "jsonwebtoken"




export const validateUser = async (req, res, next) => {
  const { errors, isValid } = validateRegister(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const { email, name } = req.body
    console.log(email, name)
    const existing = await userModel.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: "User already exists" })
    }
    const usernameExisting = await userModel.findOne({ name })
    if (usernameExisting) {
      return res.status(409).json({ message: "Username already exists" })
    }
    return next();
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" })
  }
}

export const authenticate = (req, res, next) => {
  passport.authenticate("signup", { session: false }, async (err, user) => {
    try {
      if (err) {
        throw err
      }
      sendMail(req.body.email)
      res.json({ success: true, user })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again later" })
    }
  })(req, res, next)
}

export const verifyEmail = async(req,res)=>{
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await userModel.findOneAndUpdate(
      { email: decoded.user.email },
      { $set: { isVerified: true } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'Email verification successful' });
    //here redirect to the login page...
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const validateLogin = async (req, res, next) => {
  const { errors, isValid } = validateLoginUser(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  next()
}


export const loginUser = (req, res) => {
  console.log("user login works",req.body)
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      console.log("user",user)
      try {
        if (err) {
          throw err
        }
        if (!user) {
          return res.status(401).json(info)
        }
        if (!user.isVerified) {
          sendMail(user.email)
          return res.status(403).json({ notVerified: true, user })
        }
        const token = createToken(user.email)
        return res.json({ success: true, token, user })
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again later" })
      }
    }
  )(req, res)
}

export const isUserLoggedin = (req, res, next) => {
    console.log("hello",req.headers.authorization)
    const token = req.headers.authorization;

        if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'Mykey');
        console.log("decode".decoded)
        req.user = decoded.user;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

export const getAdminDetails = async (req,res,next) => {
    console.log(req.body.email)

    try{
       const {email} = req.body
       const user = await userModel.findOne({email:email}).select('-password') 
       console.log(user)
       return res.json({ success: true, user })
    }catch(err){
        res.status(401).json({ msg: 'user details fetch failed!' }); res.status(401).json({ msg: 'user details fetching failed!' });
    }
}

export const logoutAdmin= async(req,res)=>{
    console.log("logout controller!!")
}



