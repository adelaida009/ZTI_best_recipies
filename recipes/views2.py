import django_filters
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializers import RecipeSerializer, AddedRecipeSerializer, ShoppingListSerializer, FavouritesSerializer
from rest_framework import filters
from django_filters import AllValuesFilter, DateTimeFilter, NumberFilter
from rest_framework.permissions import AllowAny
from django.shortcuts import  get_object_or_404
from django.utils import timezone
from .models import Recipe, AddedRecipe, ShoppingList, Favourities
from django.core.mail import send_mail

class RecipeFilter(django_filters.FilterSet):
    title = AllValuesFilter(name="title")
    ingredients = AllValuesFilter(name="ingredients")
    created = DateTimeFilter(name="created", lookup_expr="lte")
    tags = AllValuesFilter(name="tags")

    class Meta:
        model = Recipe
        fields = (
        "title",
        "ingredients",
        "created",
        "tags"
        )

class RecipeListView(ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    permission_classes = (AllowAny,)
    filter_class = RecipeFilter
    filter_fields = {
        "title",
        "ingredients",
        "created",
        "tags"
    }
    search_fields = (
        "^title",
        "^ingredients",
        "^created",
        "^tags"
    )
    ordering_fields = (
        "title",
        "created",
    )

class RecipeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    lookup_field = "id"
    serializer_class = RecipeSerializer

    def delete(self, request, *args, **kwargs):
        try:
            id = request.data.get("id", None)
            response = super().delete(request, *args, **kwargs)
            if response.status_code == 204:
                from django.core.cache import cache
                cache.delete("{}".format(id))
                return response
        except Exception as e:
            return Response({"message": "Błąd"})

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        if response.status_code == 200:
            mydata = response.data
            from django.core.cache import cache
            cache.set("ID : {}".format(mydata.get("id", None)), {
                "title" : mydata["title"],
                "photo" : mydata["photo"],
                "description" : mydata["description"],
                "ingredients" : mydata["ingredients"],
                "tags" : mydata["tags"]
            })


class MyRecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    permission_classes = (AllowAny, )

class SendListView(APIView):
    def post(self, request, *args, **kwargs):
        message = ""
        e_mail = request.data.get("e-mail", None)
        ingridients = request.data.get("ingridients", None)
        list = get_object_or_404(ShoppingList, user=request.user)
        list.delete()
        res = ingridients.strip('][').split(', (')
        for ingridient in res:
            res2 = ingridient.strip(')()').split(', ')
            message += f"{res2[0]} : {res2[1]} \n"
        send_mail(
            'Lista zakupów',
            message,
            'uczen543@gmail.com',
            [f"{e_mail}"],
            fail_silently=False,
        )
        return Response({"message" : "Lista została wysłana"}, status=HTTP_200_OK)

class AddToFavouritesView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        user = request.data.get("user", None)
        recipe = get_object_or_404(Recipe, slug=slug)
        favourite_qs = Favourities.objects.filter(user=user)
        if favourite_qs:
            favourite = favourite_qs[0]
            if favourite.recipes.filter(slug=recipe.slug).exists():
                return Response({"message" : "Przepis już w ulubionych"}, status=HTTP_200_OK)
            else:
                favourite.recipes.add(recipe)
                return Response({"message": "Przepis został dodany do ulubionych"}, status=HTTP_200_OK)
        else:
            favourite = Favourities.objects.create(user=request.user)
            favourite.recipes.add(recipe)
        return Response({"message" : "Przepis został dodany do ulubionych"}, status=HTTP_200_OK)

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


class RemoveFromListView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug")
        user = request.data.get("user")
        recipe = get_object_or_404(Recipe, slug=slug)
        list_qs = ShoppingList.objects.filter(user=user)
        if list_qs.exists():
            list = list_qs[0]
            if list.ingridients.filter(recipe__slug=recipe.slug).exists():
                added_recipe = AddedRecipe.objects.filter(
                    recipe=recipe,
                    user=user
                )[0]
                if added_recipe.quantity > 1:
                    added_recipe.quantity -= 1
                    added_recipe.save()
                    return Response({"message": "Odjęto przepis z listy zakupów"}, status=HTTP_200_OK)
                else:
                    list.ingridients.remove(added_recipe)
                    list.save()
                    return Response({"message": "Przepis został usunięty z twojej listy zakupów"}, status=HTTP_200_OK)
            else:
                return Response({"message": "Tego przepisu nie było na twojej liście zakupów"}, status=HTTP_400_BAD_REQUEST)

        else:
            return Response({"message": "Nie posiadasz listy zakupów"}, status=HTTP_400_BAD_REQUEST)

class ListDetailView(RetrieveAPIView):
    serializer_class = ShoppingListSerializer
    permission_classes = (AllowAny, )
    queryset = ShoppingList.objects.all()

    def get_object(self):
        try:
            list = ShoppingList.objects.get(user=self.request.user)
            return list
        except:
            return Response({"message": "Brak listy zakupów"}, status=HTTP_400_BAD_REQUEST)
class FavouritesView(ListAPIView):
    serializer_class = FavouritesSerializer
    queryset = Favourities.objects.all()
    permission_classes = (AllowAny, )


