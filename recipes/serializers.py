from rest_framework import serializers
from .models import Recipe, ShoppingList, AddedRecipe, Favourities

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = (
        "id",
        "title",
        "photo",
        "description",
        "ingredients",
        "created",
        "created_by",
        "slug",
        "tags"
        )

class FavouritesSerializer(serializers.Serializer):
    recipes = RecipeSerializer(read_only = True, many=True)
    class Meta:
        model = Favourities
        fields = (
            "id",
            "user",
            "recipes"
        )

class AddedRecipeSerializer(serializers.ModelSerializer):
    recipe = StringSerializer()
    class Meta:
        model = AddedRecipe
        fields = (
        "id",
        "recipe",
        "quantity"
        )

class ShoppingListSerializer(serializers.ModelSerializer):
    ingridients = serializers.SerializerMethodField()
    class Meta:
        model = ShoppingList
        fields = (
        "id",
        "ingridients",
        )

    def get_ingridients(self, obj):
        return AddedRecipeSerializer(obj.items.all(), many=True).data
