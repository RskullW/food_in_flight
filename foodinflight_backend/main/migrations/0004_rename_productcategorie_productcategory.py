# Generated by Django 4.1.6 on 2023-03-12 11:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_product_category'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductCategorie',
            new_name='ProductCategory',
        ),
    ]
