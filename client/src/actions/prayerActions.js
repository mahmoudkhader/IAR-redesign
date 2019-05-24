import axios from "axios";

import { GET_DATES } from "./types";

export const getDates = () => dispatch => {
  axios
    .get("api/hijri")
    .then(res => {
      dispatch({
        type: GET_DATES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_DATES,
        payload: null
      });
    });
};
