import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, "Name is required"], // fixed "require" to "required"
    },
    email: {
      type: String,
      required: [true, "Email is required"], // fixed "require" to "required"
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"], // added error message for consistency
    },
    role: {
      type: String, // added missing `type`
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Use regular function to access `this`
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Use regular function and access instance with `this`
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
