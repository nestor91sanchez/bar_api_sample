# Generated by Django 4.2.7 on 2023-11-25 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='table',
            field=models.PositiveIntegerField(),
        ),
    ]
