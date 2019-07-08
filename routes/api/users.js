//THis is the user's route, and will contain anything to do with authentication, login, passport, etc
// ONLY AUTHENTICATION - email, password, etc
// In order to use the router, need to bring in express
const express = require("express");
// When we create a route, we call this with router.get
const router = express.Router();
// Bring in BCrypt
const bcrypt = require("bcryptjs");
//Bring in Json Web Token
const jwt = require("jsonwebtoken");
// Bring in the keys
const keys = require("../../config/keys");
// Bring in passport to use in protected route
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// THIS WILL TEST THE ROUTE TO MAKE SURE IT WORKS
// @route GET api/users/test
// @desc Tests users route
// @access Public
// res.json is similar to res.send, but rather than serving the send method, it serves the json method
// THis is going to retrieve the test url
// json will auto serve a status of 200, which means everything is okay
// Will pass in a msg object to post a message
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// THIS CREATES THE ROUTE FOR USER REGISTRATION
// @route POST api/users/register
// @desc Register user
// @access Public (because they cant log in when registering)
router.post("/register", (req, res) => {
  // In order to use the string validation, we need to pull out the error and isValid properties from the function we brought in from register.js, so we will use destructuring to pull those properties out
  // validateRegisterInput(req.body) is where we want to destructure the errors and isValid properties from, and we are passing in req.body (request.body) which is everythign that is sent to that route, including the name, email, and password
  const { errors, isValid } = validateRegisterInput(req.body);
  // we need to check to see if errors contains errors, and if isValid is false
  if (!isValid) {
    // this will send the entire errors object if isValid is false
    return res.status(400).json(errors);
  }
  // Now use mongoose to find out if the email exists, because we dont want someone registering with an email thats already in the database
  // So bring in user model (check under express.router)
  // .findOne is a mongoose method to find whatever is specified before it (in this case the User) we will access it by using req.body from body parser (this is done in server.js)
  // Also, we will use a promise here. In mongoose, you can use promises or callbacks, but here we will use the .then promise
  User.findOne({ email: req.body.email }).then(user => {
    // when useing a promise, the if(user) is inferring that there IS a user with that email address
    // This will throw a error 400 status and a message if the user already exists
    if (user) {
      // Since we are passing errors already, rather than construction a wholse variable just for this, we can simply attach it as a property to errors
      errors.email = "Email already exists";
      //   return res.status(400).json({ email: "Email already exists" });
      return res.status(400).json(errors);
    } else {
      // if the user doesn't exist, create a new user
      //  when creating a user with mongoose you want to say "new" and then "whatever model name"

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        // We also need to hash the password, so look up top where we bring in bcrypt
        password: req.body.password
      });
      //need to generate a 'salt' for bcrypt which will take in the characters
      // takes in ten characters, will take back an error if there is one, and give back salt
      // once have salt we want to hash password, which takes in the plaintext password from user, pass in the salt, and pass in a callback that either returns an error or a hash to store in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // we want to store the password as a hash for security, rather than the plaintext password
          newUser.password = hash;
          // this is how we save it with mongoose with a promiseback
          newUser
            .save()
            // so we say .then, which will give us the user that is created and then will run an arrowfunction using res.json to send back a successful response with that user
            .then(user => res.json(user))
            // this is a .catch in case somethig goes wrong during the user creation
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * Moving on to tokesn, email, password, and logging in
 * Once a user logs in they are going to get backa token using the JSON web token module
 * Once they get that token they can send that along to access a protected route
 * The way the token that is sent by the user is validated is with passport and password JWT
 * So, Jason web token module (JWT) creates the token, passport will validate it and then exctract the suers information from that token
 *
 *
 * However, becore we get to tokens and such we need to add the log in functionality
 * THat means we need to accept the users email, validate the email to ensure that it exists, and then validate their password
 */

// THIS CREATES A ROUTE FOR USER LOGIN AND VALIDATION
// @route GET api/users/login
// @desc Login User / Returning Token
// @access Public
router.post("/login", (req, res) => {
  // Insert login validation
  const { errors, isValid } = validateLoginInput(req.body);
  // we need to check to see if errors contains errors, and if isValid is false
  if (!isValid) {
    // this will send the entire errors object if isValid is false
    return res.status(400).json(errors);
  }

  // Uses bodyParser to read the email and password fields
  const email = req.body.email;
  const password = req.body.password;

  // Now we need to find the user by their email
  // Sowe use the user model and mongoose
  User.findOne({ email })
    //this gives us a promise, so we use .then
    .then(user => {
      // Check for user
      // this means "if there is no user"
      if (!user) {
        errors.email = "User not found";
        // add the the email property to the errors object and just return it here
        return res.status(404).json(errors);
        // return res.status(404).json({ email: "User not found" });
      } // no need for else statement, because if the user is found it will just skip to the next statement
      // Now we check the password based on what they type in
      // However, we hashed their password when they registered using bcrypt, so we need to hash this password as well then compare the two
      // so, we run the plain text password, then the users hashed password from the user variable, since it technically passed the if statement above and as such is an existing user. the user.password arugment that is passed contains the hashed password in teh database
      // fyi compare method will give us a promise so we will use .then
      bcrypt
        .compare(password, user.password)
        // If this is true, then we will recieve (the argument will return) a true or false value, which we will store in teh variable isMatch
        .then(isMatch => {
          // Checks if 'isMatch' is true
          if (isMatch) {
            // if isMatch is true, we want to generate a token
            // Look up top to see declaration and bringing in json web token
            // res.json({ msg: "Success" });
            // User Matched
            // Sign token
            // the way this works is that if that the .sign takes in a few arguments
            // the payload, which is what we include in the token, which includes user information, because when the token gets sent to the server we want to decode the token so that the server knows what user it is
            // User Payload
            const payload = {
              id: user.id,
              name: user.name,
              name: user.email,
              access: user.access
            }; // this creates a JWT payload
            // secret/key - this will be put in config/keys.js. Now, since it is defined in that file, we need to bring keys.js in (check up top), and that is keys.secretOrKey
            // expiration - this will be an object that defines the milliseconds of how long the token will work before it expires
            // last thing is a callback with an arrowfunction (to pass in two arguments, an err and a token, because it will either give us an error or a token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                // incldue a response if true
                res.json({
                  success: true,
                  // The way we format the token int he header is to include the word Bearer, which is a protocal, and we attach it here so that we dont have to do it when we make the request. If we have a successful login, we will recieve the token
                  token: "Bearer " + token
                  // now what we will do is take the succesful token and put it in the header as an authoraziation, that will send it to the server, which will validat ethe user, and will get the user info and we can the use that info in the express server
                  // Now we need to implement   passport to do soemthign with the passport. Now will bring it into server.js Look up top to see where we bring it in
                });
              }
            );
          } else {
            // if isMatch is false (the passwords are not a match) it will return a status 400
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
            // return res.status(400).json({ password: "Password incorrect" });
          }
        });
    });
});

// THIS CREATES A PROTECTED ROUTE FOR PASSPORT AUTHENTICATION AND RETURNING TOKEN OF THE CURRENT USER THAT IT BELOGS TO
// @route GET api/users/current
// @desc Return current user
// @access Private
// This is a get request, we will pass in the url as well as the passport.authenticate parameter that passes in the jwt strategy and session: false, as well as the callback with the request response (req, res)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Send req.user back, if they are successful
    // res.json({ msg: "Success" });
    // res.json(req.user);
    // to summarize what happened here: we logged in, got the token to get authorization, and this res.json will respond with the user. However, we don't want to send the password back (even thoguht its hashed, we don't want to send a password EVER)
    // The code below extracts only the id, name, and email from the token
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      access: req.user.access
    });
  }
);

module.exports = router;
