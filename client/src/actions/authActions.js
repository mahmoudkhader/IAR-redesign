// Bringin axios
import axios from "axios";
// Import the authorization token
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// import types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
// THis becomes the action, as seen in authReducer
// pass both the userData and this.props.history from Register.js into the registerUser function

// REGISTER - This action is for user registration/sign up
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    // Route to the login form after they successfully register an account
    .then(res => history.push("./login"))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// LOGIN - This action is for user login. Need to get user token (jwt) and put in local storage, need to keep it on hand during their entire login session
export const loginUser = userData => dispatch => {
  // Axios post request, paramaters are the login route and the user data (pass the user data into the route)
  axios
    .post("/api/users/login", userData)
    // Save the token to localStoreage
    .then(res => {
      // Save the token to localStoreage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      // This decoes the data in the token and stores it in the decoded variable, along iwth teh issued at date and the exp date of the token
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove the token from localStorage so that it cannot be used anymore(use the removeItem method)
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  // Recall the setAuth token created in the utils folder: it makes it so that once the user logs in, the token gets placed into local storage, then it attaches the token to the authorization header for EVERY request. As such, we want to turn it off (set it to false)
  setAuthToken(false);
  // Set the current user to an empty object {}, which sets the isAuthenticated property to false (becasue it will fail the authReducer case function that determines if the isAuthenticated is an empty object)
  dispatch(setCurrentUser({}));
};
