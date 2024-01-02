import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
    },
    profileImage: {
      type: String,
      default:""
    },
    yearFounded: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  });
  
  const Department = mongoose.model('Department', departmentSchema);
  
  export default Department;