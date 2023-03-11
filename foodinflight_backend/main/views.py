from rest_framework import viewsets
from rest_framework import permissions
from .models import Product
from .serializers import *


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.BasePermission]


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'unique_uuid'
    permission_classes = [permissions.BasePermission]
    