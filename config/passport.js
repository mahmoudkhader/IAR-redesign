// This is where we will create our JWT passport strategy
// We need to bring in JwtStrategy and ExtractJwt, which will allow us to extract the payload(user data) from the JWT token
// First need to bring in the Strategy method from passport-jwt
const JwtStrategy = require("passport-jwt").Strategy;
// Next, bringi n the ExtractJwt method from passport-jwt
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Also want to bring in mongoose becasue we will be searching for user that comes in with the payload
const mongoose = require("mongoose");
// Also want to bring in the user model using the mongoose.model function, and the 'users' comes from the module.exports statement in models/User.js
const User = mongoose.model("users");
// Lastly, bring in keys becasue that has our secret that we need to validate
const keys = require("../config/keys");
// We'll create an empty object for options 'opts'
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Create the passport parameter that was used in the passport config in server.js
module.exports = passport => {
  // We want to use the new JwtStrategy, so we create a method/property inside of passport
  // Then we want a new JwtStrategy and pass in the opts defined earlier, which will give us back a function with a jwt_payload and done
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // keep in mind the only way this is going to be used is if we specify it on a certain route, so we will create a protected route in 'users.js'. in order to do that, we will need to bring passports into users.js
      // This will print out the token payload to the console for verification
      // iat - issued at, exp - expiration
      //   console.log(jwt_payload);
      // Now get the user that is being sent in the token, using the mongoose method .findById by passing in the object jwt_payload which is an object that has the user payload in it
      // the findById(which we will attach the property 'id' to ) will give us a promise that we need to respond with a .then
      User.findById(jwt_payload.id)
        // using .then we will get the user
        .then(user => {
          // Now check if the user has been found
          if (user) {
            // if(user) means that the user has been found, so we want to pass in the 'done' function in which we will pass two parameters: an error (there isn't one, so 'null'), and the actual user
            return done(null, user);
          }
          // Now, if the user isn't found (no need for an else statement), we're going to return done again, (with null for error), and false for the second parameter cause there isnt a user
          return done(null, false);
        })
        // Now, also put a .catch on here to log any issues if somethign goes wrong
        .catch(err => {
          console.log(err);
        });
    })
  );
};
