from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=6, default=1)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - $ {self.price}"


class Bill(models.Model):
    table = models.PositiveIntegerField()
    customer_name = models.CharField(max_length=200, default='Client')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    active = models.BooleanField(default=True)

    def calculate_amount(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.id} -  Table: {self.table} {self.customer_name}"


class Payment(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=6)

    def __str__(self):
        return f"{self.id} -  ${self.amount} - Table: {self.bill.table} {self.bill.customer_name}"
