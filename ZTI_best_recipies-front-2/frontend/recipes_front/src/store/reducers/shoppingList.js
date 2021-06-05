import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  shoppingList: [],
  error: null,
  loading: false,
};

const fetchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    shoppingList: action.shoppingList,
    error: null,
    loading: false,
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOPPING_LIST_START:
      return fetchStart(state, action);
    case actionTypes.FETCH_SHOPPING_LIST_SUCCESS:
      return fetchSuccess(state, action);
    case actionTypes.FETCH_SHOPPING_LIST_FAIL:
      return fetchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
