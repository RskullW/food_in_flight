from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import *


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.BasePermission]


class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.BasePermission]


class GroupProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GroupProductCategory.objects.all()
    serializer_class = GroupProductCategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.BasePermission]


class ProductCuisineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductCuisine.objects.all()
    serializer_class = ProductCuisineSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.BasePermission]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class =  OrderSerializer
    lookup_field = 'unique_uuid'
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'update':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def create(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)