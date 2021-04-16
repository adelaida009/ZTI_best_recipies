from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
# Tworzenie modelu użytkownika
class User(models.Model):
    nick = models.CharField(max_length=100, blank=False,
                            unique=True)
    e_mail = models.EmailField(max_length=250,blank=False,
                               unique=True)
    phone_validator = RegexValidator(regex=r'^\+?1?\d{11}$',
                                     message="Numer telefonu musi byc wprowadzony w formacie +XX XXX XXX XXX")
    phone_number = models.CharField(validators=[phone_validator], max_length=12, blank=False)
    join_date = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=20, blank=False)


#Tworzenie modelu ulubionych
class Favourites(models.Model):
    owner = models.ForeignKey(
        "auth.User",
        related_name="recipes",
        on_delete=models.CASCADE
    )
    ##################3#### SKOPIOWAĆ Z PRZEPISU RESZTĘ