// This will have the user bio, location, experience, eduation, social network, etc
// basically, all the independent user data
// In order to use the router, need to bring in express
const express = require("express");
// When we create a route, we call this with router.get
const router = express.Router();
// We need a protected route to get the current user
// Require mongoose and passport for database and protected routes
const mongoose = require("mongoose");
const passport = require("passport");
// Bringin the profile validation function
const validateProfileInput = require("../../validation/profile");
// Bringin the experience validation function
const validateExperienceInput = require("../../validation/experience");
// Bringin the education validation function
const validateEducationInput = require("../../validation/education");
// Bring in profile and user models because we will be using these in mongoose
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// description fields for route
// @route GET api/profile/test
// @desc Tests profile route
// @access Public

// res.json is similar to res.send, but rather than serving the send method, it serves the json method
// THis is going to retrieve the test url
// json will auto serve a status of 200, which means everything is okay
// Will pass in a msg object to post a message
router.get("/test", (req, res) => res.json({ msg: "Profiles Works" }));

// This is a get request for the user's profile
// When we have protected routes, we are getting a token that has a payload with the user's information, so we'll use the api/profile in order to get that info
// This is actually pretty secure because you need to be logged in to get the token and thus the user's info

// @route GET api/profile
// @desc Get current users profile
// @access Private

// The route will be the one the user is currently in because that is the route with profile anyways
// But since it is a protected route, we need to call a passport method 'authenticate' and pass in the arguments 'jwt' and an object with a property type of session: false
// Routes also need an arrow funciton with the request response paramaters (which makes it protected)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Initialize an empty object called errors(follow the same format as the users.js error handling)
    const errors = {};
    // Here is where we fetch the user's profile
    // We are going to get a token here, and we put it into req.user.id (basically we reference the ID of the User object, of the request object)
    Profile.findOne({ user: req.user.id })
      // Since there are two values that should automatically populate (the user id and the avatar) we will use the populate method from mongoose to fetch that information and populate it (since it is server controlled and not directly inputted from the user)
      .populate("user", ["name", "avatar"])
      // This gives us a promise, so we say .then
      .then(profile => {
        // This will create a test to validate whether there is an actual profile
        if (!profile) {
          // Add the noprofile proerty to the error object
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors); // 404 stats = 'not found'
        }
        res.json(profile); // This will send a 200 status, meaning everything is okay (because it found a profile)
      })
      // if something happens, throw a .catch with an 404 status and send back the error
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// This is a BACKEND API ROUTE that is used by our frontend code inorder to retrieve all of the users
// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  // Here we use find instead of findOne because we want everyone to show upm and we leave it empty to pass all users into the argument
  Profile.find()
    .populate("user", ["name", "avatar"])
    // notice how I used 'profiles' instead of 'profile'
    .then(profiles => {
      if (!profiles) {
        // later, try to have this say 'errors.noprofiles' instead and see if that works
        errors.noprofile = "There are no profiles";
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

// This is a BACKEND API ROUTE that is used by our frontend code inorder to retrieve user ifnformation (gets the profile by the handle)
// This is for the general public to see profiles by their handle
// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public

// If a route is public, we don't need passport middleware
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    //once we get the profile, the .populate method will fill it up with some of the users info
    .populate("user", ["name", "avatar"])
    // Since Profile constroctor is a promise, write a .then to validate that the profile handle actually exists
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the given handle";
        // Respond with a 404 status and the errors
        res.status(404).json(errors);
      }
      // If it passes the profiel check, return a res.json (it defaults to 200) and pass in the profile information
      res.json(profile);
    })
    // include a catch in case something goes wrong
    .catch(err => {
      res.status(404).json(err);
    });
});

// This is for the general public to see profiles by their user ID
// @route GET api/profile/handle/:user_id
// @desc Get profile by user ID
// @access Public

// If a route is public, we don't need passport middleware
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    //once we get the profile, the .populate method will fill it up with some of the users info
    .populate("user", ["name", "avatar"])
    // Since Profile constroctor is a promise, write a .then to validate that the profile handle actually exists
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the given user ID";
        // Respond with a 404 status and the errors
        res.status(404).json(errors);
      }
      // If it passes the profiel check, return a res.json (it defaults to 200) and pass in the profile information
      res.json(profile);
    })
    // include a catch in case something goes wrong
    .catch(err => {
      res
        .status(404)
        .json({ profile: "There is no profile for the given user ID" });
    });
});

// This is the route that deals with creating and updating a user profile for a registered user
// @route POST api/profile
// @desc Create or update user profile
// @access Private

// The route creates a profile for the new user, so this will be a 'post' request
router.post(
  // Leave the slash becasue it will be the same URL
  "/",
  // Leave this the same because it is a protected route
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // For validating the profile inputs, we need to destructure the error
    const { errors, isValid } = validateProfileInput(req.body);

    // Check the validation for any errors
    if (!isValid) {
      // Return any errors with a 400 status
      return res.status(400).json(errors);
    }

    // We need to get all the fields that come in
    // Set as an empty object (the object will get filled by the fields in the form)
    const profileFields = {};
    // A few things that don't come from the form:
    // 1. the user (this will pull the information from the user, which includes the name, email, and avatar)
    profileFields.user = req.user.id;
    // Check if the user.id field came in
    // This if statement checks if req.body.handle exists (if the value is true, it came in), then the profileField handle will be set to the body.handle
    if (req.body.handle) profileFields.handle = req.body.handle;
    // Now, do the same thing but for all the other fields in the form
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - these need to be split into an array, since they come in as comma separated values
    // This checks both if the array came in and if it is undefined
    if (typeof req.body.skills !== "undefined") {
      // Starting from right to left - the req.body.skills string will be split at each comma, and will populate the profileFields.skills array
      profileFields.skills = req.body.skills.split(",");
    }
    // Social - it is it's own object, so we need to initalize profileFields.social as an ampty object before we start adding the fields, because if we start adding the fields before initalizing the object it will say the profileFields.social does not exist
    profileFields.social = {};
    // Here, we are seeing first if the req.body.youtube exists, then if it does setting the youtube property within social equal to the req.body youtube property
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.youtube = req.body.youtube;
    if (req.body.instagram) profileFields.social.youtube = req.body.youtube;

    // Note: need to add the experience and education fields later. These fields are both treated as objects, but they are filled out AFTER the user has inputed their basic info

    // The following logic defines how the information is inputeed, and determines if this will be a CREATE or an UPDATE route
    // So, the first thing to do is to determine if the user exists in teh first place
    // First find the user
    Profile.findOne({ user: req.user.id })
      // We return a .then to the promise
      .then(profile => {
        // Find out if the profile exists (did they already set up their initial profile)
        if (profile) {
          // Update the profile
          // findOneAndUpdate is a method from mongoose to find and update
          // Pass three objects as arguments into the method: the user that you want to update (by the user id), and the second is sets the profile fields from all the input above, and the third is a new: true(no idea why)
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            // this gives us a promise, so we say .then, and then we update the profile
            .then(profile => {
              res.json(profile);
            });
        } else {
          // Create a profile if the user hasn't previously
          // First, check to see if the handle exists, because we don't want the user to have multiple handles (it's like a username)
          Profile.findOne({ handle: profileFields.handle })
            // This gives us a promise, so we return a .then and say that if the handle already exists, return an error
            .then(profile => {
              if (profile) {
                errors.handle = "That handle already exists";
                res.status(400).json(errors);
              }

              // If the handle does't exist, proceed to save the profile as a new profile, and populate it with the profileFields
              // This creates the new profile object, using the Profile model constructor, and passes in the profileFields data
              new Profile(profileFields)
                .save()
                // .save gives us a promise, so we say .then and include passin an arrow function that defines the profile and sends it in a json response
                .then(profile => {
                  res.json(profile);
                });
            });
        }
      });
  }
);

// This is the route for adding experience
// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // For validating the experience inputs, we need to destructure the error
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check the validation for any errors
    if (!isValid) {
      // Return any errors with a 400 status
      return res.status(400).json(errors);
    }

    // Put validation here later
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add all of the above to the experience array using the unshift method
      profile.experience.unshift(newExp);
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// This is the route for adding experience
// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // For validating the experience inputs, we need to destructure the error
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check the validation for any errors
    if (!isValid) {
      // Return any errors with a 400 status
      return res.status(400).json(errors);
    }

    // Put validation here later
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add all of the above to the experience array using the unshift method
      profile.experience.unshift(newExp);
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// This is the route for adding education
// @route POST api/profile/education
// @desc Add education to profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // For validating the education inputs, we need to destructure the error
    const { errors, isValid } = validateEducationInput(req.body);

    // Check the validation for any errors
    if (!isValid) {
      // Return any errors with a 400 status
      return res.status(400).json(errors);
    }

    // Put validation here later
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add all of the above to the education array using the unshift method
      profile.education.unshift(newEdu);
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// This is the route for DELETING experience
// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Put validation here later
    Profile.findOne({ user: req.user.id }).then(profile => {
      // We need to first find the experience that we want to delete
      // Get 'remove' index, use map, and indexof
      const removeIndex = profile.experience
        //this lets us map an array to something else
        // the arrow function allows us to map the array so that we only have the IDs
        .map(item => {
          item.id;
        })
        // now we pass  the exp_id of the current item through the indexOf method to find it's location in the array
        .indexOf(req.params.exp_id);
      // Now splice that value out of the array
      profile.experience.splice(removeIndex, 1);
      // Now we save this and send it back
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    });
  }
);

// This is the route for DELETING education
// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Put validation here later
    Profile.findOne({ user: req.user.id }).then(profile => {
      // We need to first find the education that we want to delete
      // Get 'remove' index, use map, and indexof
      const removeIndex = profile.education
        //this lets us map an array to something else
        // the arrow function allows us to map the array so that we only have the IDs
        .map(item => {
          item.id;
        })
        // now we pass  the edu_id of the current item through the indexOf method to find it's location in the array
        .indexOf(req.params.edu_id);
      // Now splice that value out of the array
      profile.education.splice(removeIndex, 1);
      // Now we save this and send it back
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    });
  }
);

// This is the route for DELETING THE ENTIRE PROFILE
// @route DELETE api/profile
// @desc Delete user profile
// @access Private
// it is private because we need to have the user that is submitting the form logged in
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
