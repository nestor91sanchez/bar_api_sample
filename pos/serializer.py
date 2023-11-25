from rest_framework import serializers
from .models import Bill, Payment, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BillSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', read_only=True, decimal_places=2, max_digits=6)

    class Meta:
        model = Bill
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    total_amount = serializers.DecimalField(read_only=True, max_digits=6, decimal_places=2)

    class Meta:
        model = Bill
        fields = ('table', 'total_amount')


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
