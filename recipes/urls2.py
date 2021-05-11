from .views2 import RecipeListView, AddToListView, ListDetailView, RemoveFromListView, AddToFavouritesView, RecipeDetailView, SendListView, MyRecipesView, FavouritesView
from django.urls import path

urlpatterns = [
    path("", RecipeListView.as_view(), name="main-page"),
    path("add-to-list/", AddToListView.as_view(), name="add-to-list"),
    path("remove-from-list/", RemoveFromListView.as_view(), name="remove-from-list"),
    path("list-summary/", ListDetailView.as_view(), name="list-summary"),
    path("favourites/", FavouritesView.as_view(), name="favourities"),
    path("my-recipes/", MyRecipesView.as_view(), name="my-recipes"),
    path("recipe/<int:id>/", RecipeDetailView.as_view(), name="destroy-recipe"),
    path("send-list/", SendListView.as_view(), name="send-list"),
    path("add-to-favourites/", AddToFavouritesView.as_view(), name="add-to-favourites")
]