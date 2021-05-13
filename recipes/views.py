from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, View
from django.utils import timezone
from django.http import HttpResponse
from django.contrib import messages
from .models import Recipe, AddedRecipe, ShoppingList, Favourities
from .forms import RecipeForm
from django.utils.text import slugify
from unidecode import unidecode
from django.core.mail import send_mail
# Create your views here.


class HomeView(ListView):
    model = Recipe
    paginate_by = 10
    template_name = "main_page.html"

class MyRecipes(ListView):
    model = Recipe
    template_name = "my_recipes.html"

class ShoppingListSummaryView(ListView):
    model = ShoppingList
    template_name = "shopping_list_summary.html"

class FavouritiesView(ListView):
    model = Favourities
    template_name = "favourites.html"

def update_recipe(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    form = RecipeForm(request.POST or None,
                      instance=recipe)
    if form.is_valid():
        form.save()
        return redirect("recipes:recipe",slug = slug)
    return render(request, "update_recipe.html", {
        "recipe":recipe,
        "form":form}
                  )

def send_list(request, ingridients):
    message = ""
    list = get_object_or_404(ShoppingList, user = request.user)
    list.delete()
    res = ingridients.strip('][').split(', (')
    for ingridient in res:
        res2 = ingridient.strip(')()').split(', ')
        message += f"{res2[0]} : {res2[1]} \n"
    send_mail(
        'Lista zakupów',
         message,
        'uczen543@gmail.com',
        [f"{request.user.email}"],
        fail_silently=False,
    )
    print(request.user)
    return render(request, "send_email.html", {})

def add_to_favourites(request, slug):
    recipe = get_object_or_404(Recipe,slug=slug)
    favourite_qs = Favourities.objects.filter(user = request.user)
    if favourite_qs:
        favourite = favourite_qs[0]
        if favourite.recipes.filter(slug=recipe.slug).exists():
            messages.info(request, "Przepis już jest w ulubionych")
        else:
            messages.info(request, "Przepis został ddany do ulubionych")
            favourite.recipes.add(recipe)
    else:
        messages.info(request, "Przepis został ddany do ulubionych")
        favourite = Favourities.objects.create(user = request.user)
        favourite.recipes.add(recipe)
    return redirect("recipes:recipe", slug=slug)

class RecipeView(DetailView):
    model = Recipe
    template_name = "recipe.html"

def add_to_list(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug)
    added_recipe, created = AddedRecipe.objects.get_or_create(
        recipe=recipe,
        user=request.user
    )
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

def search_recipe(request):
    if request.method == "POST":
        tag = request.POST.get("tag")
        recipes_by_title = Recipe.objects.filter(title__contains=tag)
        recipes_by_tag = Recipe.objects.filter(tags__contains=tag)
        recipes = list(recipes_by_tag)
        for recipe in recipes_by_title.all():
            flag = True
            for tag_recipe in recipes:
                if tag_recipe.title==recipe.title:
                    flag = False
            if flag:
                recipes.append(recipe)
                flag = True
        return render(request, "search.html",
                      {"tag":tag,
                       "recipes":recipes})
    else:
        return render(request, "search.html")

def add_recipe(request):
    if request.method == "POST":
        form = RecipeForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            photo = form.cleaned_data["photo"]
            description = form.cleaned_data["description"]
            ingredients = form.cleaned_data["ingredients"]
            newslug = '{0} {1}'.format(title, timezone.now())

            Recipe.objects.create(title = title,
                                    photo = photo,
                                    description = description,
                                    ingredients = ingredients,
                                    created_by = request.user,
                                    slug = slugify(unidecode(newslug)))

    form = RecipeForm()
    return render(request, "add_recipe.html", {"form":form})