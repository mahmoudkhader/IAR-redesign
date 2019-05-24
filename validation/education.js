// This file is copied from the login.js validation script, and it acts to validate required fields in the profile fields input

// Changed name of function from validateLoginInput to validateEducationInput

// Will use the validator module/package
//https://github.com/chriso/validator.js/ - this module validates strings, like emails, strings, etc. But ONLY strings

// Bring in validator
const Validator = require("validator");
// Bring in isEmpty global function
const isEmpty = require("./is-empty");

// We want to export the function, where each file will have it's own function name
module.exports = function validateEducationInput(data) {
  // initialize errors as an empty object
  let errors = {};

  // Remember: validator only takes in strings. So if there is somethign that isnt a string input, we need to convert it before we validate it
  // This is where the validation occurs

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Validate that school is not empty
  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  // Validate that degree is not empty
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  // Validate that field of study is not empty
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  // Validate that from date is not empty
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
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
