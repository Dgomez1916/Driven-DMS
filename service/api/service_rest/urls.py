from django.urls import path

from .views import (
    api_list_technicians,
    api_list_appointments,
    api_update_appointment,
    api_delete_appointment,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_create_technicians"),
    path("technicians/<int:id>/", api_list_technicians, name="delete_technician"),
    path("appointments/", api_list_appointments, name="create_appointment"),
    path("appointments/<int:pk>/", api_delete_appointment, name="delete_appointment"),
    path("appointments/<int:pk>/<str:action>/", api_update_appointment, name="update_appointment"),
]
