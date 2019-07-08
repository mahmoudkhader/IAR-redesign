// THis is our route reducer, and we want to bring all of our other reducers here
// import a reducer compiner from redux
// Turns an object whose values are different reducer functions, into a single reducer function. It will call every child reducer, and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions.
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
export default combineReducers({
  // This object will contain our reducers
  // To use anythiung from the authReducer in our components, we will say this.props.auth
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
