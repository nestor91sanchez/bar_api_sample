# Generated by Django 4.2.7 on 2023-11-25 19:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0007_alter_bill_customer_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='bill',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='product',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='product',
            name='updated_at',
        ),
    ]
