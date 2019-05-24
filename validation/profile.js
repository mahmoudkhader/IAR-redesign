// This is where the profile input rules go
// This file is copied from the login.js validation script, and it acts to validate required fields in the profile fields input

// Changed name of function from validateLoginInput to validateProfileInput

// Will use the validator module/package
//https://github.com/chriso/validator.js/ - this module validates strings, like emails, strings, etc. But ONLY strings

// Bring in validator
const Validator = require("validator");
// Bring in isEmpty global function
const isEmpty = require("./is-empty");

// We want to export the function, where each file will have it's own function name
module.exports = function validateProfileInput(data) {
  // initialize errors as an empty object
  let errors = {};

  // Remember: validator only takes in strings. So if there is somethign that isnt a string input, we need to convert it before we validate it
  // This is where the validation occurs

  //   If there is anythign that doesnt contain the type "string", it will be returned as nundefined or null, so we want to turn it into an empty string and then check it with the validator to make sure it is empty
  // Required fields:
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Validate that the handle input is between 2 and 40 characters (so if not is length)
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }

  // Validate that the handle is inputed (since it is required)
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  // Validate that the status is inputed (since it is required)
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  // This is using the Validator's 'isEmpty' method
  // Validate that the skills are inputed (since it is required)
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  // Social media, website, etc are not required, but we want them to be formatted as URLs, so we need to make sure they aren't empty first, because if they are empty and we create URLs the user will see a URL error (even if it is not there)
  // this is using our custom isEmpty method (from is-empty.js)
  if (!isEmpty(data.website)) {
    // Once we have validated that the website field is populated, we can verify that it is a URL using the Validator.isURL method
    if (!Validator.isURL(data.website)) {
      errors.website = "Please enter a valid URL";
    }
  }
  // Now, rinse lather repeat for the social media sites
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Please enter a valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Please enter a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Please enter a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Please enter a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Please enter a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Please enter a valid URL";
    }
  }
  return {
    errors: errors,
    // If errors array is empty, this is a valid input form
    isValid: isEmpty(errors)
  };
};
