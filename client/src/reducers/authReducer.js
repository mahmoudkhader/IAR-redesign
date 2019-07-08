import isEmpty from "../validation/is-empty";
// Bring in the dispatch that sets the current user
import { SET_CURRENT_USER } from "../actions/types";

// create initial state for auth reducers
const initialState = {
  // Test out the Redux ext
  confirmReduxIsActive: "Redux is active",
  isAuthenticated: false,
  user: {}
};

// function takes in initial state and action because we will dispatch actions to this reducer and this is where we do the testing
export default function(state = initialState, action) {
  // test with a javascript switch function
  // action is an object that includes a type
  switch (action.type) {
    case SET_CURRENT_USER:
      // Create case for current user that returns the current state as and whether it is authenticated (if not empty from backend validation)
      // If it is empty, it is not authenticated, use the validation to return an error
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    //   spread operator (...) takes what is in the state and adds to it
    // action.payload is the payload contining the userData form authActions, so it iwll set user = to that payload

    default:
      return state;
  }
}
