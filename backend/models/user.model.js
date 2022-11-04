const mongoose = require("mongoose");
const argon2 = require("argon2");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: { unique: true },
    },
    role: {
      type: String,
      default: "user",
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await argon2.hash(this.password);
  next();
});

schema.methods.verify = async function (password) {
  return await argon2.verify(this.password, password);
};

const User = mongoose.model("User", schema);
module.exports = User;
