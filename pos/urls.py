from django.urls import include, path
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from pos import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductView, 'products')
router.register(r'bills', views.BillView, 'bills')
router.register(r'payments', views.PaymentView, 'payments')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title='Bar Api'))
]