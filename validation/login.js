// This is where the login rules go
// Will use the validator module/package
//https://github.com/chriso/validator.js/ - this module validates strings, like emails, strings, etc. But ONLY strings
// To make this easy, I am going to copy all the code from register.js and just make some tweaks (dont need name or password 2, and changed name of function to validateLoginInput)

// Bring in validator
const Validator = require("validator");
// Bring in isEmpty global function
const isEmpty = require("./is-empty");

// We want to export the function, where each file will have it's own function name
module.exports = function validateLoginInput(data) {
  // initialize errors as an empty object
  let errors = {};

  // If a request is sent and there is no data inputted it wont be an empty string, it will be null, invalid, etc. We need isEmpty to be an empty string for this to work, so we assign data.name
  // use a ternery operator to check if else
  // if data.name is not empty, then it is whatever data.name is, but if it is empty it will be set to an empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //check if this email is a valid email (or if it is not a valid email)
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Make sure the password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // Validate that email is not empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
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
