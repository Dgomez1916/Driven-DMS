from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    SOLD_CHOICES = (
        (False, "Not Sold"),
        (True, "Sold"),
    )
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField(choices=SOLD_CHOICES, default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.IntegerField(primary_key=True)


class Appointment(models.Model):
    SERVICE_CHOICES = (
        (False, "Not Serviced"),
        (True, "Serviced"),
    )
    ate_time = models.DateTimeField("Date and Time", auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length=500)
    status = models.BooleanField(choices=SERVICE_CHOICES, default=False)
    vin = models.CharField(max_length=200, unique=True)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        null=True,
    )
