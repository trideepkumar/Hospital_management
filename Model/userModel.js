import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
    },
    image:{
        type: String,
        default: "",
    },
    email: {
      type: String, 
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const Users = mongoose.model("Users", userSchema);

export default Users;