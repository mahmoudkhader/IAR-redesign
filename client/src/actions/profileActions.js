// Create action/function that hits the api/profiel
// Whatever token is sent will get TAHT users profile
// Bringin axios
import axios from "axios";
// import types
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
// Import the authorization token
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

// Get teh current profile
export const getCurrentProfile = () => dispatch => {
  // Dispatching this action wills et the loading state
  dispatch(setProfileLoading());
  //   Make request
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        // If the user is already registered but has not made a profile, return an empty object because they need to create a rpfofile
        payload: {}
      })
    );
};

// Get profile by handle (when wanting to view a user's profile) (pass in the handle, which comes from the route)
export const getProfileByHandle = handle => dispatch => {
  // Dispatching this action wills et the loading state
  dispatch(setProfileLoading());
  //   Make request
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        // If the requested user does not exist by handle (aka issues arise) return null as the payload
        payload: null
      })
    );
};

// Create Profile
// This action will use the create-profile route to actually create hte user profile based on tehri form inputs
// Remember: if you want to redirect, you have to use with router and pass in the  history in order to rediret, because once teh profile is created we want to redirect
export const createProfile = (profileData, history) => dispatch => {
  axios
    // Passes in the post route and the profileData that will be posted
    .post("/api/profile", profileData)
    // Proimise return that redirects to the dashboard when successful
    .then(res => history.push("./dashboard"))
    // Returns errors if failed
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add work experience
export const addExperience = (expData, history) => dispatch => {
  axios
    // Passes in the post route and the expData that will be posted
    .post("/api/profile/experience", expData)
    // Proimise return that redirects to the dashboard when successful
    .then(res => history.push("./dashboard"))
    // Returns errors if failed
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete work experience
export const deleteExperience = id => dispatch => {
  axios
    // Passes in the delete route (including the experience ID) and the expData that will be deleteed
    .delete(`/api/profile/experience/${id}`)
    // Proimise return that redirects to the profile using dispatch
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    // Returns errors if failed
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    // Passes in the post route and the eduData that will be posted
    .post("/api/profile/education", eduData)
    // Proimise return that redirects to the dashboard when successful
    .then(res => history.push("./dashboard"))
    // Returns errors if failed
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete education
export const deleteEducation = id => dispatch => {
  axios
    // Passes in the delete route (including the experience ID) and the eduData that will be deleteed
    .delete(`/api/profile/education/${id}`)
    // Proimise return that redirects to the profile using dispatch
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    // Returns errors if failed
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    // Passes in the get route for all profiles
    .get("/api/profile/all/")
    // Proimise return that redirects to the profile using dispatch
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    // Returns get_profiles if there are none, but the payload will be "null" becasue this is required to display the message in the markup that states that therea re no profiles
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          // this returns an empty object as the current user, since they no longer exist
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
// this returns a type that basically lets the reducer know that the profile is loading so that we can have an animation or something
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
