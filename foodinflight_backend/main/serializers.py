from rest_framework import serializers
from .models import *



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'ordering')


class ProductCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }


class GroupProductCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupProductCategory
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }


class ProductCuisineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductCuisine
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }




class ProductSerializer(serializers.HyperlinkedModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = ProductCategorySerializer(read_only=True)
    group_categories = GroupProductCategorySerializer(many=True, read_only=True)
    cuisine = ProductCuisineSerializer(read_only=True)
    
    class Meta:
        model = Product
        exclude = ['is_active']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }


class OrderProductSerializer(serializers.ModelSerializer):
    # item = ProductSerializer()
    
    class Meta:
        model = OrderProduct
        fields = ('order_uuid', 'item_slug', 'item_title', 'amount', 'price', 'add_ice')

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    items = OrderProductSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = '__all__'
        lookup_field = 'unique_uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'unique_uuid'},
        }

       