import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "'firstName' is required parameter"],
    },
    lastName: {
      type: String,
      required: [true, "'lastName' is required parameter"],
    },
    email: {
      type: String,
      required: [true, "'email' is required parameter"],
      validate: [validator.isEmail, "Please enter valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "'password' is required parameter"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ENCODING_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default mongoose.model("User", userSchema);
