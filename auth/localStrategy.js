    import passport from "passport"
import { Strategy as localStrategy } from "passport-local"
import userModel from "../Model/userModel.js"

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField:"name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, name, password, done) => {
      try {
        const email = req.body.email;
        const user = new userModel({
          email,
          password,
          name,
        })
        await user.save()
        return done(null, user)
      } catch (error) {
        console.log(error)
        done(error)
      }
    }
  )
)

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
        console.log(email,password)
      try {
        const user = await userModel.findOne({ email })
        if (!user) {
          return done(null, false, { message: "User not found" })
        }
        
        const validate = await user.isValidPassword(password)
        console.log(validate)
        if (!validate) {
          return done(null, false, { message: "Wrong Password" })
        }
        return done(null, user, { message: "Logged in successfully" })
      } catch (error) {
        return done(error)
      }
    }
  )
)