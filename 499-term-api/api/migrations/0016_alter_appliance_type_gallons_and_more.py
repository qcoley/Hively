# Generated by Django 4.1.5 on 2023-03-28 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_rename_type_id_appliance_appliance_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliance_type',
            name='gallons',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='appliance_type',
            name='wattage',
            field=models.FloatField(),
        ),
    ]
