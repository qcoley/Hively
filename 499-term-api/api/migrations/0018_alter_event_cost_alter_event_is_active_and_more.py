# Generated by Django 4.1.5 on 2023-04-08 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_aperture_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='cost',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='is_active',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='water_used',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='watts_used',
            field=models.FloatField(null=True),
        ),
    ]
