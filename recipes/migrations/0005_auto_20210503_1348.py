# Generated by Django 3.0.5 on 2021-05-03 11:48

from django.db import migrations
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_auto_20210501_2337'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='slug',
            field=django_extensions.db.fields.AutoSlugField(blank=True, editable=False, populate_from=['title', 'created', 'created_by']),
        ),
    ]
