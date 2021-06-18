import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchShoppingListStart = () => {
  return {
    type: actionTypes.FETCH_SHOPPING_LIST_START,
  };
};

export const fetchShoppingListSuccess = (shoppingList) => {
  return {
    type: actionTypes.FETCH_SHOPPING_LIST_SUCCESS,
    shoppingList,
  };
};

export const fetchShoppingListFail = (error) => {
  return {
    type: actionTypes.FETCH_SHOPPING_LIST_FAIL,
    error: error,
  };
};

export const fetchShoppingList = () => {
  return (dispatch) => {
    dispatch(fetchShoppingListStart());
    axios
      .get("http://127.0.0.1:8000/api/list-summary")
      .then((response) => {
        const shoppingList = response.data.results;
        // const shoppingList = {
        //   jajka: 2,
        //   sól: 1,
        //   Drożdże: "50g",
        //   salami: 2,
        //   slugs: [
        //     "jajecznica-2021-05-03-1202180188380000",
        //     "pizza-2021-05-03-1205135176620000",
        //     "recipe-1",
        //   ],
        // };

        dispatch(fetchShoppingListSuccess(shoppingList));
      })
      .catch((error) => dispatch(fetchShoppingListFail(error)));
  };
};
