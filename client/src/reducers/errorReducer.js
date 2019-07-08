import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// create initial state for auth reducers
// OLD initialState CODE
// const initialState = {
//   Test out the Redux ext
//   confirmReduxIsActive: "Redux is active",
//   isAuthenticated: false,
//   user: {}
// };
// Basically we just want an empty object for the initial state
const initialState = {};

// function takes in initial state and action because we will dispatch actions to this reducer and this is where we do the testing
export default function(state = initialState, action) {
  // test with a javascript switch function
  // action is an object that includes a type
  switch (action.type) {
    //   spread operator (...) takes what is in the state and adds to it
    // action.payload is the payload contining the userData form authActions, so it iwll set user = to that payload
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
