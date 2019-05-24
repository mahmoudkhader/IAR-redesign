// Convention for models: start with a capital and be singular
// Bring in mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  //What will our users collection have? A bio, profile handle, company, website, etc
  // Here we will add each field:
  // Since this is a user profile, it only makes sense to have the user also be in the Schema
  user: {
    // ObjectId will associate the user by it's ID
    type: Schema.Types.ObjectId,
    // Reference the collection; that this refers to, which in this case is users
    ref: "users"
  },
  handle: {
    // We want an SEO friendly URL for the profile, so that they can go to devconnector.com/profile/mahmoudkhader
    type: String,
    // The following are validations that we will technically be already handling with our validation scripts, which are more controlled to our spec, but these are here as a second line of defense
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    // This is for what they are doing, are they a student, working, etc
    type: String,
    required: true
  },
  skills: {
    // In mongoose this is going to be an array of strings, becasuse in the form they will input things in comma separated values, and our form will turn them into an array and store them into the database that way
    type: [String]
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  // Now we get into experience array
  // To do that, we will put everything in array brackets, and then put fields inside of curly brackets to make it an array of objects
  experience: [
    {
      // Everythign here operates as an embedded object
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  // Now, similar to before, but for education
  education: [
    {
      // Everythign here operates as an embedded object
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  // Social object (this will not be treated as an array)
  social: {
    // Everythign here operates as an embedded object
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
