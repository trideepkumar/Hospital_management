import mongoose from "mongoose";
import { config } from "dotenv";

config();



mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb+srv://trideepkumar111:eVXLi2oPhUhOJS2t@cluster0.fcmdxbh.mongodb.net/")
  .then(() => {
    console.log(`Connected to the database${5000}`);
  })
  .catch((error) => {
    console.error(`Couldn't connect to the database: ${error}`);
  });

export default mongoose.connection;