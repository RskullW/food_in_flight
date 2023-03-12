from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'categories', ProductCategoryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
