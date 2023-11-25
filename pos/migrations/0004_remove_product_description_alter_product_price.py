# Generated by Django 4.2.7 on 2023-11-25 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0003_product_available'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='description',
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=6),
        ),
    ]
