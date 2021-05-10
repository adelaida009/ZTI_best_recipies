from .views2 import RecipeListView, AddToListView, ListDetailView
from django.urls import path

urlpatterns = [
    path("", RecipeListView.as_view(), name="main-page"),
    path("add-to-list/", AddToListView.as_view(), name="add-to-list"),
    path("list-summary/", ListDetailView.as_view(), name="list-summary")
]