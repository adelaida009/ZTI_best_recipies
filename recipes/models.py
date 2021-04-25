from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator

# Create your models here.

# Tworzenie modelu użytkownika
class User(models.Model):
    nick = models.CharField(max_length=100, blank=False,
                            unique=True)
    e_mail = models.EmailField(max_length=250,blank=False,
                              unique=True)

    phone_validator = RegexValidator(regex=r'^\+?1?\d{9}$',
                                     message="Numer telefonu musi byc wprowadzony w formacie  XXXXXXXXX")
    phone_number = models.CharField(validators=[phone_validator], max_length=12, blank=False)
    join_date = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=20, blank=False)



    def __str__(self):
        return self.nick

#Tworzenie modelu listy zakupów
class ShoppingList(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    ingridients = models.CharField(max_length=1000, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ingridients


# Tworzenie modelu przepisu
class Recipe(models.Model):
    title = models.CharField(max_length=200, blank=False)
    photo = models.CharField(max_length=1000, blank=False) #URL of the photo
    description = models.CharField(max_length=2000)
    ingredients = models.CharField(max_length=1000, blank=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        related_name="recipes_created",
        on_delete=models.DO_NOTHING,
    )
    def __str__(self):
        return self.title

class AddedRecipe(models.Model):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE
    )

class Favourities(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    recipes = models.ManyToManyField(Recipe)