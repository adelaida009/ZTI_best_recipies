from django import forms
from .models import Recipe

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = (
            "title",
            "photo",
            "description",
            "ingredients",
            "tags"
        )
        labels={
            "title": "",
            "photo": "",
            "description": "",
            "ingredients": "",
            "tags" : "",
        }
        widgets = {
            "title": forms.TextInput(attrs={"class":"form-control", "placeholder":"Tytuł"}),
            "photo":forms.TextInput(attrs={"class":"form-control", "placeholder":"Zdjęcie"}),
            "description":forms.TextInput(attrs={"class":"form-control", "placeholder":"Opis"}),
            "ingredients": forms.TextInput(attrs={"class":"form-control", "placeholder":"Składniki"}),
            "tags": forms.TextInput(attrs={"class": "form-control", "placeholder": "Tagi"}),
        }