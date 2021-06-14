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
        // const favourites = [
        //   {
        //     id: 1,
        //     title: "#1 recipe",
        //     photo: "https://media.giphy.com/media/oS2lkrdaq3a3m/giphy.gif",
        //     description: "Example recipe #1",
        //     ingredients: '{"makaron": 1, "pomidor": 2}',
        //     created: "2021-04-03T13:12:42.377000Z",
        //     created_by: 1,
        //     slug: "recipe-1",
        //     tags: "obiad, makaron",
        //   },
        // ];
        dispatch(fetchFavouritesSuccess(favourites));
      })
      .catch((error) => dispatch(fetchFavouritesFail(error)));
  };
};
