import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

// create initial state for profile reducer
const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

// function takes in initial state and action because we will dispatch actions to this reducer
export default function(state = initialState, action) {
  // test with a javascript switch function
  // action is an object that includes a type
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        // current state
        ...state,
        // set loading to true
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        // set loading back to false
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        // set loading back to false
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
