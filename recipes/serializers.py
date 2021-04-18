from rest_framework import serializers
from recipes.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "nick",
            "e_mail",
            "phone_number",
            "join_date"
        )