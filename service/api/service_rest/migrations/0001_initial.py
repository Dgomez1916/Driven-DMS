# Generated by Django 4.0.3 on 2023-10-24 20:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('import_href', models.CharField(max_length=200, unique=True)),
                ('vin', models.CharField(max_length=200, unique=True)),
                ('sold', models.BooleanField(choices=[(False, 'Not Sold'), (True, 'Sold')], default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('employee_id', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('reason', models.CharField(max_length=500)),
                ('status', models.BooleanField(choices=[(False, 'Canceled'), (True, 'Finished')], null=True)),
                ('vin', models.CharField(max_length=200, unique=True)),
                ('customer', models.CharField(max_length=200)),
                ('vip', models.BooleanField(choices=[(False, 'No'), (True, 'Yes')], default=False)),
                ('technician', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='technicians', to='service_rest.technician')),
            ],
        ),
    ]
