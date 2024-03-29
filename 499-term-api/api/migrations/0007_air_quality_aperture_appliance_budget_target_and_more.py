# Generated by Django 4.1.5 on 2023-03-24 21:32

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_appliancetype_appliance_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Air_Quality',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('co', models.IntegerField()),
                ('co2', models.IntegerField()),
                ('humidity', models.FloatField()),
                ('pm', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Aperture',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.IntegerField(choices=[(1, 'door'), (2, 'window')])),
                ('status', models.BooleanField()),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Appliance',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('status', models.BooleanField()),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Budget_Target',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('max_cost', models.FloatField()),
                ('max_water', models.FloatField()),
                ('max_energy', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Thermostat',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('current_temp', models.FloatField()),
                ('target_temp', models.FloatField()),
                ('min_temp', models.FloatField()),
                ('max_temp', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.AddField(
            model_name='appliance_type',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 3, 24, 21, 32, 47, 380237, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('on_at', models.DateTimeField()),
                ('off_at', models.DateTimeField()),
                ('watts_used', models.FloatField()),
                ('water_used', models.FloatField()),
                ('cost', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
                ('appliance_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.appliance')),
            ],
        ),
        migrations.AddField(
            model_name='appliance',
            name='type_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.appliance_type'),
        ),
    ]
