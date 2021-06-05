from django.contrib import admin

from .models import ShoppingList, AddedRecipe, Recipe, Favourities

admin.site.register(ShoppingList)
admin.site.register(AddedRecipe)
admin.site.register(Recipe)
admin.site.register(Favourities)