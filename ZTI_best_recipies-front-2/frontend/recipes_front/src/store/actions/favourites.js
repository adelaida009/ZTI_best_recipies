import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchFavouritesStart = () => {
  return {
    type: actionTypes.FETCH_FAVOURITES_START,
  };
};

export const fetchFavouritesSuccess = (favourites) => {
  return {
    type: actionTypes.FETCH_FAVOURITES_SUCCESS,
    favourites,
  };
};

export const fetchFavouritesFail = (error) => {
  return {
    type: actionTypes.FETCH_FAVOURITES_FAIL,
    error: error,
  };
};

export const fetchFavourites = () => {
  return (dispatch) => {
    dispatch(fetchFavouritesStart());
    axios
      .get("http://127.0.0.1:8000/api/favourites")
      .then((response) => {
        const favourites = response.data.results;
        dispatch(fetchFavouritesSuccess(favourites));
      })
      .catch((error) => dispatch(fetchFavouritesFail(error)));
  };
};
