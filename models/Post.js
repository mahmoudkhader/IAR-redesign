// This is the model for our Post
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema
const PostSchema = new Schema({
  user: {
    // ObjectId will associate the user by it's ID
    type: Schema.Types.ObjectId,
    // Reference the collection that this refers to, which in this case is users
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  // These schema types will be pulled from the user and assigned to the post, sot hat the info is preserved even if the user deletes their profile
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  // If a user likes an post, their name will go into this array, and that user's name can only be added once, that way we don't have user's liking something multiple times
  likes: [
    // all the likes on the post
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    // all the comments on the post
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    // Date of the post
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
