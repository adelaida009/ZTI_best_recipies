# Generated by Django 3.0.5 on 2021-04-27 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0008_remove_addedrecipe_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='addedrecipe',
            name='quantity',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
