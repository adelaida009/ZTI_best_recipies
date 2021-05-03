from django.urls import path
from .views import HomeView, RecipeView, add_to_list, remove_from_list, ShoppingListSummaryView, \
    FavouritiesView, add_to_favourites, add_recipe, search_recipe
app_name = "recipes"
urlpatterns = [
    path("", HomeView.as_view(), name="recipe-list"),
    path("recipe/<slug>/", RecipeView.as_view(), name="recipe"),
    path("favourites/", FavouritiesView.as_view(), name="favourities"),
    path("add-to-favourites/<slug>/", add_to_favourites, name="add-to-favourites"),
    path("add-to-list/<slug>/", add_to_list, name="add-to-list"),
    path("remove-from-list/<slug>/", remove_from_list, name="remove-from-list"),
    path("shopping-list/", ShoppingListSummaryView.as_view(), name="shopping-list"),
    path("add-recipe/", add_recipe, name="add-recipe"),
    path("search-recipe/", search_recipe, name="search_recipe"),
]