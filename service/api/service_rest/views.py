from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
import json
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


# Create your views here

# AutomobileVO encoder
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "href",
    ]

# Technician list encoder
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "employee_id",
        "first_name",
        "last_name",
    ]

# Appointment list encoder
class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "vip",
        "customer",
        "date_time",
        "technician",
        "reason",
        "status",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

# List technicians, create/delete technician
@require_http_methods(['GET', 'POST', 'DELETE'])
def api_list_technicians(request, pk=None):

    if request.method == 'GET':
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder,
            )
        except ObjectDoesNotExist:
            return JsonResponse(
                {"error": "Object does not exist"},
                status=404,
            )

    elif request.method == 'POST':
        try:
            content = json.loads(request.body)

            first_name = content["first_name"]
            last_name = content["last_name"]
            employee_id = content["employee_id"]

            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except ValueError:
            return JsonResponse(
                {"error": "Invalid JSON data"},
                status=400
            )
    elif request.method == 'DELETE':
            try:
                technician = Technician.objects.get(pk=pk)
                technician.delete()
                return JsonResponse(
                {"message": f"Technician {technician.pk} deleted successfully"},
                status=200,
            )
            except ObjectDoesNotExist:
                return JsonResponse(
                    {"error": "Technician not found"},
                    status=404,
                )



# List appointments, create/delete, update - cancel/serviced
@require_http_methods(["GET", "POST",])
def api_list_appointments(request, vin=None):
    if request.method == "GET":
        if vin == None:
            appointments = Appointment.objects.all().order_by('date_time')

            return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
        else:
            try:
                appointments = Appointment.objects.filter(vin=vin)
                return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
            except Appointment.DoesNotExist:
                response = JsonResponse({"message": "Appointment does not exist"})
                response.status_code = 404
                return response
    else:
        content = json.loads(request.body)
        try:
            tech_id = content["technician"]
            tech = Technician.objects.get(id=tech_id)
            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid tech id"}
            )
        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True
        else:
            content["vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == 'DELETE':
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.delete()
            return JsonResponse(
                {"message": f"Appointment {appointment.pk} deleted successfully"},
                status=200,
            )
        except ObjectDoesNotExist:
            return JsonResponse(
                {"error": "Appointment not found"},
                status=404
            )


@require_http_methods(["PUT"])
def api_update_appointment(request, pk, action=None):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return JsonResponse(
            {"error": "Appointment not found"},
            status=404,
        )

    # Validate the action parameter
    if action not in ['cancel', 'finish']:
        return HttpResponseBadRequest("Invalid action")

    # Update the appointment status based on the action
    if action == 'cancel':
        appointment.status = 'canceled'  # Set status to "Canceled"
    elif action == 'finish':
        appointment.status = 'finished'  # Set status to "Finished"

    appointment.save()

    return JsonResponse(
        {"message": f"Appointment {appointment.pk} status updated to {action}"},
        status=200,
    )
