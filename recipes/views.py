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
    added_recipe = AddedRecipe.objects.create(recipe = recipe)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs:
        list = list_qs[0]
    else:
        creation_date = timezone.now()
        list = ShoppingList.objects.create(user=request.user,
                                           creation_date=creation_date)
        print(recipe.ingredients)
        list.ingridients.add(recipe.ingredients)
        list.save()
    return redirect("recipes:recipe",slug = slug)

def remove_from_list(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs:
        list = list_qs[0]
        if list.ingridients.filter(recipe__slug=recipe.slug).exist():
            list.ingridients.remove(recipe.ingredients)

    else:
        return redirect("recipes:product", slug=slug)
    return redirect("recipes:recipe", slug=slug)