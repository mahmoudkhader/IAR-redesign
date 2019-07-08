// Convention for models: start with a capital and be singular
// Bringi n mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  //What will our users collection have? A name, email, password, avatar, and a date
  //WIll use gravatar for avatar, if they have one associated with email
  // Here we will add each field:
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  access: {
    type: String,
    default: "none"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
