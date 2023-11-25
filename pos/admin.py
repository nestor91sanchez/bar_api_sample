from django.contrib import admin
from pos.models import Bill, Payment, Product

admin.site.register([Bill, Payment, Product])
