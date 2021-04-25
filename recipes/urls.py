from django.urls import path
from .views import recipe_list, recipe_detail

app_name = "recipes"
urlpatterns = [
    path("", recipe_list, name="recipe-list"),
    path("/blog-post", recipe_detail, name="blog-post")
]