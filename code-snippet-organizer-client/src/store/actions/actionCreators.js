import * as actionTypes from "./actionTypes";

export const fetchCodingSnippets = () => {
  return dispatch => {
    fetch("http://localhost:3000/code")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: actionTypes.VIEW_SNIPPET_LIST, payload: json });
      });
  };
};
