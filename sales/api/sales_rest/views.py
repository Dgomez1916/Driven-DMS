from django.http import JsonResponse
import json
from .models import AutomobileVO, Customer, Salesperson, Sale
from .encoders import (
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
    AutomobileVOEncoder
)
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def list_automobile_vo(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
            sold=False
        )


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson was not created"},
                status=404,
            )
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_salesperson(request, pk):
    try:
        salesperson = Salesperson.objects.get(id=pk)
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Salesperson does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(SalespersonEncoder(salesperson).data)
    elif request.method == "DELETE":
        salesperson.delete()
        return JsonResponse({"message": "Salesperson deleted"}, status=200)


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer was not created"},
                status=404,
            )
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_customer(request, pk):
    try:
        customer = Customer.objects.get(id=pk)
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(CustomerEncoder(customer).data)
    elif request.method == "DELETE":
        customer.delete()
        return JsonResponse({"message": "Customer deleted"}, status=200)


@require_http_methods(["GET", "POST"])
def api_list_sale(request):
    if request.method == "GET":
        try:
            sale = Sale.objects.all()
            return JsonResponse(
                {"sale": sale},
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404
            )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(
                vin=content['automobile'])
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile with VIN not found in the database"},
                status=404
        )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson ID does not exist"},
                status=404
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer ID does not exist"},
                status=404
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404
            )

