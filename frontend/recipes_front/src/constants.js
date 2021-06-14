const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const recipeListURL = `${endpoint}/recipe-list/`;
export const addToFavouritesURL = `${endpoint}/add-to-favourites/`;
export const deleteFromFavouritesURL = `${endpoint}/remove-from-favourites/`;
export const addToShoppingListURL = `${endpoint}/add-to-list`;
export const deleteFromShoppingListURL = `${endpoint}/remove-from-list`;
export const sendShoppingList = `${endpoint}/send-list`;
export const addNewRecipe = `${endpoint}/api`;
