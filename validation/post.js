// Bring in validator
const Validator = require("validator");
// Bring in isEmpty global function
const isEmpty = require("./is-empty");

// We want to export the function, where each file will have it's own function name
module.exports = function validatePostInput(data) {
  // initialize errors as an empty object
  let errors = {};

  // Only thing that is going to require validation is the text inside the post
  // Nothing else is going to be empty because it will be coming in programmatically (from the database, not user controlled)
  data.text = !isEmpty(data.text) ? data.text : "";

  // Validate that text field is between 10 and 300 characters
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  //Make sure the text field is not empty
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
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
