import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        // take the posts arrray and delete the post based on the id that is passed in through the payload
        // to do this, go to state.posts and filter by each post in teh array
        // if the post._id is not equal to the action.payload, and what that does is check if that post id exists in the post array, and if it does not then it will update the ui automatically to reflect the changes
        // Basically returns false if the post no longer exists, thus removing that post from the state
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
