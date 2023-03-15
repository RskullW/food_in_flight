from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', ProductCategoryViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'group_categories', GroupProductCategoryViewSet)
router.register(r'cuisines', ProductCuisineViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
]
