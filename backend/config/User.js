const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    phone: { type: String },
  },
  { collection: "Users" }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  console.log("Just before saving", user.password);
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  console.log("Just before saving & after hashing", user.password);
  next();
});

mongoose.model("Users", UserSchema);
