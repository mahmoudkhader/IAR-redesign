// this is where all the user posts will be routed (with comments, likes, etc )
// In order to use the router, need to bring in express
const express = require("express");
// When we create a route, we call this with router.get
const router = express.Router();
const mongoose = require("mongoose");
// Bring in passport to protect the routes
const passport = require("passport");

// Bring in the Post model
const Post = require("../../models/Post");
// Bring in the Profile model
const Profile = require("../../models/Profile");
// Bring in Post Validation
const validatePostInput = require("../../validation/post");
// description fields for route
// @route GET api/posts/testd
// @desc Tests posts route
// @access Public

// res.json is similar to res.send, but rather than serving the send method, it serves the json method
// THis is going to retrieve the test url
// json will auto serve a status of 200, which means everything is okay
// Will pass in a msg object to post a message
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// Create a route that displays all the posts
// @route GET api/posts
// @desc Get posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json({ nopostsfound: "No posts found" });
    });
});

// Create a route that gets the posts by the ID
// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    // Here, we only want one post (based on the ID)
    .then(post => {
      // Changed this to an if statement to validate that the post actually exists
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch(err => {
      res.status(404).json({ nopostfound: "No post found with that ID" });
    });
});

// Create a route that allows us to create a post
// @route POST api/posts
// @desc Create post
// @access Private
// Protect the route with passport and authenticate with jwt
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Use destructuring to extract the errors and isValid objects from validatePostInput
    const { errors, isValid } = validatePostInput(req.body);

    // Check the validation
    if (!isValid) {
      // If there are any errors send an error 400 with the errors object
      return res.status(400).json(errors);
    }

    // This is how we create a new post
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
      // in react, we will pull the user name and avatar from the user state. When the user is logged in , redux is going to keep that users information in the active state, as long as they are logged into the application. As such, when they are logged in, we have access to whatever data is relavent to them. When they submit a post, we will pull it from that state, rather than reenter their info every time
    });
    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// Let a user delete their post
// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
// This is a protected route since only a user can delet etheir own post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //   Check for the post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          // Delete
          post.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

// This route let's users like posts
// Note: the :id is going to be the post id
// @route Post api/posts/like/:id
// @desc Like post
// @access Private
// This is a protected route since only a user can delet etheir own post
router.post(
  "/like/:id",
  // This route is protected because a user can only like/dislike while loggged in
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // .filter loops through the post likes
          // need to convert the like.user (the user ID of the person liking the post) must be a string. Then makes sure that they haven't already liked it (if greater than 0, return an error)
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          // Otherwise, add the user id to the likes array
          post.likes.unshift({ user: req.user.id });
          // Save this,
          post.save().then(post => {
            res.json(post);
          });
        })
        .catch(err => {
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

// This route let's users unlike (remove like, not dislike) posts
// Note: the :id is going to be the post id
// @route Post api/posts/unlike/:id
// @desc Unlike post
// @access Private
// This is a protected route since only a user can delet etheir own post
router.post(
  "/unlike/:id",
  // This route is protected because a user can only like/dislike while loggged in
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          // .filter loops through the post likes
          // need to convert the like.user (the user ID of the person liking the post) must be a string. Then makes sure that they haven't already liked it (if greater than 0, return an error)
          if (
            //   Change the equation to === 0, because if they don't already like it, they can't unlike it
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Otherwise, get the remove index
          //  post.likes is the entire array of likes
          const removeIndex = post.likes
            // This creates a new array that takes the item array, extracts all the users, and converts them to stirng type
            .map(item => item.user.toString())
            // This gives us the user that we want to remove
            .indexOf(req.user.id);
          // Now, splice that user out of the array
          post.likes.splice(removeIndex, 1);

          // Save the changes
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// Add comments
// @route Post api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Use destructuring to extract the errors and isValid objects from validatePostInput
    const { errors, isValid } = validatePostInput(req.body);

    // Check the validation
    if (!isValid) {
      // If there are any errors send an error 400 with the errors object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      // This sends us back a post. Once we get this (.then)
      .then(post => {
        const newComment = {
          text: req.body.text,

          name: req.body.name,

          avatar: req.body.avatar,

          user: req.user.id
        };
        // Add information to the comments array
        post.comments.unshift(newComment);

        // Save the new comments and post them back
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        res.status(404).json({ postnotfound: "No post found" });
      });
  }
);

// Delete comments
// @route Post api/posts/comment/:id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      // This sends us back a post. Once we get this (.then)
      .then(post => {
        // Check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        // Get remove index (same as unliking)
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // to remove, splice out of array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        res.status(404).json({ postnotfound: "No post found" });
      });
  }
);

module.exports = router;
