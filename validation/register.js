// Bring in validator
const Validator = require("validator");
// Bring in isEmpty global function
const isEmpty = require("./is-empty");

// We want to export the function, where each file will have it's own function name
module.exports = function validateRegisterInput(data) {
  // initialize errors as an empty object
  let errors = {};

  // If a request is sent and there is no data inputted it wont be an empty string, it will be null, invalid, etc. We need isEmpty to be an empty string for this to work, so we assign data.name
  // use a ternery operator to check if else
  // if data.name is not empty, then it is whatever data.name is, but if it is empty it will be set to an empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // We want the registered name to be at least 2 char but not longer than 30 char
  // use the isLength method, taking in two parameters which will be the data.name and a second parameter that details the length(these parameters get passed into the isLength method from validator)
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    // Take object error and add name key with message:
    errors.name = "Name must be between 2 and 30 characters";
  }

  // here, we will validate that we dont want the name field to be empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Now do it for email, and check if it is an email as well as if it is a valid email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //check if this email is a valid email (or if it is not a valid email)
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Make sure the password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  //check if this password is a valid password lenght (between 6 and 30)
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "Password must be at least 6 characters and less than 30 characters";
  }

  //Make sure the password is not empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  //check if this confirmation password matches the first password (or if it does not equal the first password)
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // If valid, return an object with the errors (the first property is actually errors: errors,  but since that is redundant es6 will just say 'errors')
  return {
    errors: errors,
    // Since errors is an object, we need to create a global object that checks if something is empty
    // use the global function isEmpty and pass in the object errors as it's argument
    isValid: isEmpty(errors)
    // Now make sure to load input validation into the users.js file
  };
};
