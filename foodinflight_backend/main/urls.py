from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'categories', views.ProductCategorieViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
