import express from "express";
import cors from 'cors';
import db from "./config/db.config.js";
import userRouter from './routes/userRouter.js'
import passport from "passport"
import { Strategy as localStrategy } from "passport-local"


import { config } from 'dotenv';
config();


const app = express();
const PORT = process.env.PORT || 3000;



//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());




//db
let server
db.once("open", () => {
  server = app.listen(3000, () => {
    console.log(`Server listening to port ${PORT}`)
  })
})
db.on("error", (error) => {
  console.error(`Database connection error: ${error}`);
});



//routes

app.use("/api", userRouter)


