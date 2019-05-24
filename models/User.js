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
  avatar: {
    // For avatar, when they put in email in the registration there will be logic that hits the avatar server to get the image, then will put it here. If not, will put a placeholder
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
