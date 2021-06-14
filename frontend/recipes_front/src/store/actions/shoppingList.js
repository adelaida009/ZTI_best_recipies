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
        // const shoppingList = [
        //   {
        //     id: 1,
        //     ingredients: [
        //       {
        //         id: 12,
        //         quantity: 1,
        //         name: "pomidory",
        //         recipe: "#1 recipe",
        //       },
        //       {
        //         id: 13,
        //         quantity: 2,
        //         name: "oliwki",
        //         recipe: "#1 recipe",
        //       },
        //     ],
        //   },
        // ];

        dispatch(fetchShoppingListSuccess(shoppingList));
      })
      .catch((error) => dispatch(fetchShoppingListFail(error)));
  };
};
