// Create function isEmpty
// function isEmpty(value) {
//   return (
//     // remember, || creates "or" statements
//     value === undefined || // if value is undefined
//     value === null || // if value is null
//     (typeof value === "object" && Object.keys(value).length === 0) || // if empty object - checks if something is an object and if the object.keys has a value of 0 (if it's keys are empty, it is an empty object, since we are looking at the keys and if they are populated they would't be empty)
//     (typeof value === "string" && value.trim().length === 0) // if empty stringchecks if something is a string and if it is empty (an empty string)
//   );
// }
// turn into arrow function (no need for the word function or the return statement)
const isEmpty = value =>
  // remember, || creates "or" statements
  value === undefined || // if value is undefined
  value === null || // if value is null
  (typeof value === "object" && Object.keys(value).length === 0) || // if empty object - checks if something is an object and if the object.keys has a value of 0 (if it's keys are empty, it is an empty object, since we are looking at the keys and if they are populated they would't be empty)
  (typeof value === "string" && value.trim().length === 0); // if empty stringchecks if something is a string and if it is empty (an empty string)

module.exports = isEmpty;
