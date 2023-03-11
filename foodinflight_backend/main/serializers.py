from rest_framework import serializers
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'ordering')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }


class ProductCategorieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductCategorie
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }


class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ('item_title', 'amount', 'price', 'add_ice')
        lookup_field = 'unique_uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'unique_uuid'},
        }

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    items = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ('url', 'state', 'unique_uuid', 'items', 'created', 'updated', 'items_price', 'delivery_price', 'total_price',
                   'name', 'email', 'phone', 'address')
        lookup_field = 'unique_uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'unique_uuid'},
        }