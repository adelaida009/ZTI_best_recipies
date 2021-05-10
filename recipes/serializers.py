from rest_framework import serializers
from .models import Recipe, ShoppingList, AddedRecipe

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

class ShoppingListSerializer(serializers.ModelSerializer):
    ingridients = StringSerializer()
    class Meta:
        model = ShoppingList
        fields = (
        "id",
        "ingridients",
        )

class AddedRecipeSerializer(serializers.ModelSerializer):
    recipe = serializers.SerializerMethodField()
    class Meta:
        model = AddedRecipe
        fields = (
        "id",
        "recipe",
        "quantity"
        )

    def get_ingridients(self):
        return AddedRecipeSerializer(obj.ingridients.all(), many=True).data
