from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    SOLD_CHOICES = (
        (False, "Not Sold"),
        (True, "Sold"),
    )
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField(choices=SOLD_CHOICES, default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50)


class Appointment(models.Model):
    SERVICE_CHOICES = (
        (False, "Canceled"),
        (True, "Finished"),
    )
    VIP_CHOICES = (
        (False, "No"),
        (True, "Yes"),
    )
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=500)
    status = models.BooleanField(choices=SERVICE_CHOICES, null=True)
    vin = models.CharField(max_length=200, unique=True)
    customer = models.CharField(max_length=200)
    vip = models.BooleanField(choices=VIP_CHOICES, default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        null=True,
        on_delete=models.PROTECT,
    )
