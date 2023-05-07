from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .models import *
from .serializers import *
from django.contrib.auth.models import User



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
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'partial_update':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        access_token_provided = request.META.get('HTTP_AUTHORIZATION')

        if access_token_provided is not None:
            token_key = access_token_provided[6:14]
            token = AuthToken.objects.filter(token_key=token_key)[:1].get()

            if token:
                requested_user_id = int(token.user_id)
                requested_user = User.objects.filter(id=requested_user_id)[:1].get()

                if requested_user.is_staff:
                    queryset = Order.objects.all()
                else:
                    queryset = Order.objects.filter(email=requested_user.email)

                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid access token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Access token was not provided'}, status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        access_token_provided = request.META.get('HTTP_AUTHORIZATION')

        if access_token_provided is not None:
            token_key = access_token_provided[6:14]
            token = AuthToken.objects.filter(token_key=token_key)[:1].get()

            if token:
                requested_user_id = int(token.user_id)
                requested_user = User.objects.filter(id=requested_user_id)[:1].get()
                    
                print('User: ', requested_user)
                print('request.data: ', request.data)
                
                try:
                    items = request.data.pop('items')
                except:
                    items = []
                
                order_data = request.data.dict()
                order_data['email'] = requested_user.email

                serializer = self.get_serializer(data=order_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                headers = self.get_success_headers(serializer.data)

                created_order_queryset = Order.objects.filter(unique_uuid=serializer.data.get('unique_uuid'))[:1].get()

                print(created_order_queryset.email)
                if created_order_queryset:
                    for item in items:
                        try:
                            item_from_db = Product.objects.filter(slug=item.get('slug'))[:1].get()
                        except Product.DoesNotExist:
                            error = f"Product with slug {item.get('slug')} does not exist"
                            return Response({'error':  error}, status=status.HTTP_400_BAD_REQUEST)
                        add_ice = True if item.get('add_ice') is True else False

                        OrderProduct.objects.create(
                            item=item_from_db, 
                             order=created_order_queryset, 
                            amount=item.get('amount'), 
                               add_ice=add_ice
                      )
                else:
                    return Response({'error': 'Unable to create new order'}, status=status.HTTP_400_BAD_REQUEST)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            else:
                return Response({'error': 'Invalid access token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Access token was not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data_to_update = request.data
        data_to_update['tg_notified'] = False

        serializer = self.get_serializer(instance, data=data_to_update, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(status=status.HTTP_204_NO_CONTENT)
        
    def retrieve(self, request, *args, **kwargs):
        access_token_provided = request.META.get('HTTP_AUTHORIZATION')

        if access_token_provided is not None:
            token_key = access_token_provided[6:14]
            token = AuthToken.objects.filter(token_key=token_key)[:1].get()

            if token:
                instance = self.get_object()
                serializer = self.get_serializer(instance)
        
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid access token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Access token was not provided'}, status=status.HTTP_401_UNAUTHORIZED)
