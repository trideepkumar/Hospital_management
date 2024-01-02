import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String, 
  },
  profileDescription: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'heads'],
    required: true,
  },
  isDeleted:{
    type:Boolean,
    default:false
}
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;