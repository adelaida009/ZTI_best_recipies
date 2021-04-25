from django.shortcuts import render
from .models import Recipe

# Create your views here.

def recipe_list(request):
    context = {
        "recipes": Recipe.objects.all()
    }
    return render(request, "blog-list.html", context)

def recipe_detail(request):
    context = {
        "recipes": Recipe.objects.all()
    }
    return render(request, "blog-post.html", context)