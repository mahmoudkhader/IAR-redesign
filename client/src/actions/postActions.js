// Import axios so that we can make requests
import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  // Clear any errors that were left over from previous attempts during current state
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get single Post (one single post from the list when clicking on the comments button)
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Post
// Takes in an id because it needs to know which post to delete
export const deletePost = id => dispatch => {
  axios
    // need to pass in the id in this url
    .delete(`/api/posts/${id}`)
    .then(res =>
      // In dispatch, need to pass the DELETE_POST type, and the payload is the id becasue in the reducer, we need to delete the post locally
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
// Takes in an id because it needs to know which post to like
export const addLike = id => dispatch => {
  axios
    // need to pass in the id in this url
    .post(`/api/posts/like/${id}`)
    .then(res =>
      // There is no need to do anythign other htan refresh the page to display like changes, so in this case all that needs to happen is call the getPosts method
      dispatch(getPosts())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
// Takes in an id because it needs to know which post to ulike
export const removeLike = id => dispatch => {
  axios
    // need to pass in the id in this url
    .post(`/api/posts/unlike/${id}`)
    .then(res =>
      // There is no need to do anythign other htan refresh the page to display like changes, so in this case all that needs to happen is call the getPosts method
      dispatch(getPosts())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment to post
export const addComment = (postId, commentData) => dispatch => {
  // Clear any errors that were left over from previous attempts during current state
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment from post
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set post loading (set loading state)
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors (remove lingering errors after successful post/comment)
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
