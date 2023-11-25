from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .serializer import BillSerializer, PaymentSerializer, ProductSerializer, TableSerializer
from .models import Bill, Payment, Product
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class BillView(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    queryset = Bill.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['table']

    @action(detail=False, methods=['GET'])
    def bills_active(self, request):
        grouped_bills = Bill.objects.filter(active=True).values('table').annotate(
            total_amount=Sum(models.F('product__price') * models.F('quantity'), output_field=models.DecimalField())
        )
        serialized_data = TableSerializer(grouped_bills, many=True).data
        return Response(serialized_data)


class PaymentView(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()

    # def perform_create(self, serializer):
    #     bill = serializer.validated_data['bill']
    #     total_amount = bill.product.price * bill.quantity
    #
    #     # Divide el total entre la cantidad de amigos (3 en este caso)
    #     friends_count = 3
    #     amount_per_friend = total_amount / friends_count
    #
    #     # Asigna el usuario actual al pago
    #     serializer.save(user=self.request.user, amount=amount_per_friend)
