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
        console.log(response.data);
        const shoppingList = response.data;

        dispatch(fetchShoppingListSuccess(shoppingList));
      })
      .catch((error) => dispatch(fetchShoppingListFail(error)));
  };
};
