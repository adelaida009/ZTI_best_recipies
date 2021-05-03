from django import forms


class RecipeForm(forms.Form):
    title = forms.CharField(max_length=200)
    photo = forms.CharField(max_length=1000)  # URL of the photo
    description = forms.CharField(max_length=2000)
    ingredients = forms.CharField(max_length=1000)
