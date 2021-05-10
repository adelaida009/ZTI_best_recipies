from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .models import Recipe
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializers import RecipeSerializer, AddedRecipeSerializer, ShoppingListSerializer
from rest_framework.permissions import AllowAny
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

class RecipeListView(ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    permission_classes = (AllowAny,)

class AddToListView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        user = request.data.get("user", None)
        #if slug or user is None:
        #    return Response({"message":"Złe zapytanie"},status=HTTP_400_BAD_REQUEST)
        recipe = get_object_or_404(Recipe, slug=slug)
        added_recipe, created = AddedRecipe.objects.get_or_create(
            recipe=recipe,
            user=user
        )
        list_qs = ShoppingList.objects.filter(user=user)
        if list_qs:
            list = list_qs[0]
            if list.ingridients.filter(recipe__slug=recipe.slug).exists():
                #messages.info(request, "Przepis został oddany do listy zakupów")
                added_recipe.quantity += 1
                added_recipe.save()
                return Response(status=HTTP_200_OK)
            else:
                #messages.info(request, "Przepis został oddany do listy zakupów")
                list.ingridients.add(added_recipe)
                return Response(status=HTTP_200_OK)
        else:
            list = ShoppingList.objects.create(user=user,
                                               creation_date = timezone.now())
            #messages.info(request, "Przepis został dodany do listy zakupów")
            list.ingridients.add(added_recipe)
        return Response(status=HTTP_200_OK)

class ListDetailView(RetrieveAPIView):
    serializer_class = ShoppingListSerializer
    permission_classes = (AllowAny, )
    queryset = ShoppingList.objects.all()

