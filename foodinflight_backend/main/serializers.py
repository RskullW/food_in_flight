from rest_framework import serializers
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'ordering']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ['is_active']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }

        
class OrderProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderProduct
        fields = '__all__'
        lookup_field = 'unique_uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'unique_uuid'},
        }

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    items = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
        lookup_field = 'unique_uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'unique_uuid'},
        }