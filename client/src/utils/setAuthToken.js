// This files takes care of adding the authorization tokento every request if the user is logged in
import axios from "axios";

const setAuthToken = token => {
  // Checks if the token exists
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
