from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView
from django.utils import timezone
from django.contrib import messages
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
    added_recipe, created = AddedRecipe.objects.get_or_create(
        recipe=recipe,
        user=request.user
    )
    #if added_recipe_qs.exists():
    #    added_recipe = added_recipe_qs[0]
    #else:
    #    added_recipe = AddedRecipe.objects.create(recipe = recipe)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs:
        list = list_qs[0]
        if list.ingridients.filter(recipe__slug=recipe.slug).exists():
            messages.info(request, "Przepis został oddany do listy zakupów")
            added_recipe.quantity += 1
            added_recipe.save()
        else:
            messages.info(request, "Przepis został oddany do listy zakupów")
            list.ingridients.add(added_recipe)
    else:
        list = ShoppingList.objects.create(user=request.user,
                                           creation_date = timezone.now())
        messages.info(request, "Przepis został dodany do listy zakupów")
        list.ingridients.add(added_recipe)
    return redirect("recipes:recipe",slug = slug)

def remove_from_list(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    list_qs = ShoppingList.objects.filter(user=request.user)
    if list_qs.exists():
        list = list_qs[0]
        if list.ingridients.filter(recipe__slug=recipe.slug).exists():
            added_recipe = AddedRecipe.objects.filter(
                recipe=recipe,
                user=request.user
            )[0]
            if added_recipe.quantity > 1:
                messages.info(request, "Odjęto przepis z listy zakupów")
                added_recipe.quantity -= 1
                added_recipe.save()
            else:
                messages.info(request, "Przepis został usunięty z twojej listy zakupów")
                list.ingridients.remove(added_recipe)
                list.save()
        else:
            messages.info(request, "Tego przepisu nie było na twojej liście zakupó")
            return redirect("recipes:recipe", slug=slug)

    else:
        return redirect("recipes:recipe", slug=slug)
    return redirect("recipes:recipe", slug=slug)