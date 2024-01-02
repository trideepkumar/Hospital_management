import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


const isNameValid = (value) => {
    const name = value?.trim()
    if (!name?.length > 0) {
      return false
    }
    return true
  }

  
  const isEmailValid = (value) => {
    const email = value?.trim()
    if (!email?.length) {
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false
    }
    return true
  }

  const isPasswordValid = (value) => {
    const password = value?.trim()
    if (!password?.length) {
      return false
    }
    return true
  }

 

export const validateRegister = (user) => {
    const errors = {}
    if (!isNameValid(user.name)) {
      errors.firstName = "Please enter a valid first name"
    }
    if (!isEmailValid(user.email)) {
      errors.email = "Please enter a valid email"
    }
    if (!isPasswordValid(user.password)) {
      errors.password = "Please enter a valid password"
    }
    const isValid = !Object.keys(errors).length
    return {
      isValid,
      errors,
    }
  }


  export const createToken = ( email) => {
    const user = { email }
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET_KEY || 'Mykey')
    return token
  }


  export const validateLoginUser = (details) => {
    const errors = {}
    if (!isEmailValid(details.email)) {
      errors.email = "Please enter a valid email"
    }
    if (!isPasswordValid(details.password)) {
      errors.password = "Please enter a valid password"
    }
    const isValid = !Object.keys(errors).length
    return { isValid, errors }
  }


  export const sendMail = async (mail) => {
    try {
        console.log(mail)
      let token = createToken(mail)
      console.log(token)
      const verificationLink = `http://localhost:3000/api/verify/${token}`;
      console.log(verificationLink)
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL||'trideepkumar111@gmail.com',
          pass: process.env.NODEMAILER_PASSWORD ||'bvznychwnxnqhdbv',
        },
      })
      let detail = {
        from: process.env.NODEMAILER_EMAIL||'trideepkumar111@gmail.com',
        to: mail,
        subject: "Hospital Management Verification Link",
        text: `Your OTP for email verification is ${verificationLink} `,
      }
      console.log("sending")
      let info = await transporter.sendMail(detail)
      console.log("Message sent: %s", info.messageId)
      return info
    } catch (error) {
      throw error
    }
  }


  export const validatePassword = (user) => {
    const errors = {}
    if (!isPasswordValid(user.password)) {
      errors.password = "Please enter a valid password"
    }
   
    const isValid = !Object.keys(errors).length
    return { isValid, errors }
  }





  