// Import Axios to call backend API, which will then call IARs API

import axios from "axios";

export const handleAthanCall = fullDate => dispatch => {
  axios
    .get("/api/hijri/prayer/", {
      params: {
        date: fullDate
        // date: "2019-7-4"
      }
    })
    .then(
      res =>
        dispatch({
          payload: res.data
        })
      // res.json();
    )
    .catch(err =>
      dispatch({
        payload: null
      })
    );
};
