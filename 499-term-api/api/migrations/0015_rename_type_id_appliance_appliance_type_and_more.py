# Generated by Django 4.1.5 on 2023-03-24 21:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_event'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appliance',
            old_name='type_id',
            new_name='appliance_type',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='appliance_id',
            new_name='appliance',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='log_id',
            new_name='log',
        ),
    ]
