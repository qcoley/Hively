# Generated by Django 4.1.5 on 2023-04-14 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_event_on_at'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Event',
        ),
    ]
