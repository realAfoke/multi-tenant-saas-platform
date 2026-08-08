from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import generics, permissions,status
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from users.services.auth import verify_email,verify_otp
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from users.api.serializers import UserSerializer,LoginSerializer
import logging
 

# Create your views here.

User=get_user_model()

logger=logging.getLogger(__name__)


class SignUpView(generics.CreateAPIView):
    serializer_class=UserSerializer
    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        refresh=RefreshToken.for_user(user)
        response=Response(serializer.data)
        response.set_cookie(
                key='access',
                value=str(refresh.access_token),
                path='/',
                secure=True,
                samesite='None',
                httponly=True,
                max_age=60*60*24*7
                )
        response.set_cookie(
                key='refresh',
                value=str(refresh),
                path='/',
                secure=True,
                samesite='None',
                httponly=True,
                max_age=60*60*24*7
            )
        return response

@api_view(['POST'])
def send_otp(request):
    otp=verify_email(User,request)
    return Response(otp)


@api_view(['POST'])
def confirm_otp(request):
    try:
        key=request.data.get('key')
        value=request.data.get('otp') 
    except ValueError as e:
        return Response(str(e))
    result=verify_otp(key,value)
    return Response(result)


class LoginView(TokenObtainPairView):
    serializer_class=LoginSerializer
    def post(self, request: Request, *args, **kwargs) -> Response:
        data=super().post(request, *args, **kwargs)
        data=data.data or {}
        access=data.pop('access','')
        refresh=data.pop('refresh','')
        response=Response(data)
        response.set_cookie(
                key='access',
                value=str(access),
                path='/',
                secure=True,
                samesite='None',
                httponly=True,
                max_age=60*5
                )
        response.set_cookie(
                key='refresh',
                value=str(refresh),
                path='/',
                secure=True,
                samesite='None',
                httponly=True,
                max_age=60*60*24*7
                )
        return response


@api_view(['POST'])
def logout(request):
        respone=Response({"message":"logout"})
        respone.delete_cookie("access")
        respone.delete_cookie("refresh")
        return respone

class RefreshTokenView(TokenRefreshView):
        def post(self, request: Request, *args, **kwargs) -> Response:
                serializer=self.get_serializer(data={'refresh':request.COOKIES.get('refresh')})
                try:
                        serializer.is_valid(raise_exception=True)
                except TokenError as e:
                        raise InvalidToken(e.args[0]) from e
                access=serializer.validated_data.get('access')
                response=Response(status=status.HTTP_200_OK)
                response.set_cookie(
                                key='access',
                                value=str(access),
                                httponly=True,
                                secure=True,
                                samesite='None',
                                path='/',
                                max_age=60*5
                                )
                return response


class Me(generics.RetrieveUpdateAPIView):
        queryset=User.objects.all()
        serializer_class=UserSerializer
        permission_classes=[permissions.IsAuthenticated]

        def get_object(self):
            return self.request.user

