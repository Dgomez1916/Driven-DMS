from django.contrib import admin
from .models import Appointment, AutomobileVO

# Register your models here.
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = [
        "date_time",
        "id",
        "reason",
        "status",
        "vin",
        "customer",
        "vip",
        "technician",
    ]

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
