# Generated by Django 3.0.5 on 2021-04-16 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_auto_20210416_2318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nick',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
