from django.urls import path
from .views import HomeView, RecipeView, add_to_list

app_name = "recipes"
urlpatterns = [
    path("", HomeView.as_view(), name="recipe-list"),
    path("recipe/<slug>/", RecipeView.as_view(), name="recipe"),
    path("add-to-list/<slug>/", add_to_list, name="add-to-list")
]