from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView
from django.utils import timezone
from .models import Recipe, AddedRecipe, ShoppingList

# Create your views here.


class HomeView(ListView):
    model = Recipe
    template_name = "blog-list.html"

class RecipeView(DetailView):
    model = Recipe
    template_name = "blog-post.html"

def add_to_list(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    if AddedRecipe.objects.filter(recipe=recipe):
        added_recipe = AddedRecipe.objects.filter(recipe=recipe)[0]
    else:
        added_recipe = AddedRecipe.objects.create(recipe = recipe)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs:
        list = list_qs[0]
        if list.ingridients.filter(slug=recipe.slug):
            added_recipe.quantity += 1
            added_recipe.save()
    else:
        list = ShoppingList.objects.create(user=request.user,
                                           creation_date = timezone.now())
        list.ingridients.add(added_recipe)
        list.save()
    return redirect("recipes:recipe",slug = slug)

def remove_from_list(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs:
        list = list_qs[0]
        if list.ingridients.filter(slug=recipe.slug):
            list.ingridients.remove(recipe)
            return redirect("recipes:recipe", slug=slug)

    else:
        return redirect("recipes:recipe", slug=slug)
    return redirect("recipes:recipe", slug=slug)