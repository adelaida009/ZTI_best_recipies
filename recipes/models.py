from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
from django.shortcuts import reverse
from django.utils.text import slugify
from unidecode import unidecode
import json

# Create your models here.
# Tworzenie modelu przepisu
class Recipe(models.Model):
    title = models.CharField(max_length=200, blank=False)
    photo = models.CharField(max_length=1000, blank=False) #URL of the photo
    description = models.CharField(max_length=2000)
    ingredients = models.CharField(max_length=1000, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        related_name="recipes_created",
        on_delete=models.DO_NOTHING,
    )
    slug = models.SlugField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("recipes:recipe", kwargs={
            "slug": self.slug
        })

    def add_to_list_url(self):
        return reverse("recipes:add-to-list", kwargs={
            "slug": self.slug
        })

    def add_to_favourites_url(self):
        return reverse("recipes:add-to-favourites", kwargs={
            "slug": self.slug
        })

    def remove_from_list_url(self):
        return reverse("recipes:remove-from-list", kwargs={
            "slug": self.slug
        })

class AddedRecipe(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.recipe.title}"

    def get_ingridients(self):
        ingridients_json = json.loads(self.recipe.ingredients)
        keys = ingridients_json.keys()
        values = []
        for k in keys:
            value = ingridients_json[k] * self.quantity
            values.append(value)
        result = list(zip(keys, values))
        return result

#Tworzenie modelu listy zakupów
class ShoppingList(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    ingridients = models.ManyToManyField(AddedRecipe)
    creation_date = models.DateTimeField(auto_now_add=True)

    slug = models.SlugField(blank=True, null=True)

    def get_field_values(self):
        return self.ingridients

    def sum_ingridients(self):
        items = {}
        found = False
        for ingridient in self.ingridients.all():
            elements = ingridient.get_ingridients()
            print(elements)
            for element in elements:
                for k in items.keys():
                    if element[0] == k:
                        items[k] += element[1]
                        found = True
                if not found:
                    items[element[0]] = element[1]
                found = False
        return items.items()


    def __str__(self):
        return f"Lista zakupów"

class Favourities(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    recipes = models.ManyToManyField(Recipe)