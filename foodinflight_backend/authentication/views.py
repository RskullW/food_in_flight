from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer



class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        if request.data.get('username') != request.data.get('email'):
            return Response({'message': 'Username should be equal to email'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_with_same_email = User.objects.filter(email=request.data.get('email')).values()

        if user_with_same_email:
            return Response({'message': 'Username with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid()
            user = serializer.save()

            return Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'token': AuthToken.objects.create(user)[1]
            }, status=status.HTTP_201_CREATED)
        

class LoginAPI(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)