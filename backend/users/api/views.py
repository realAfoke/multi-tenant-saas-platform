from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import generics
from users.services.auth import verify_email,verify_otp
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from users.api.serializers import UserSerializer,LoginSerializer

# Create your views here.


User=get_user_model()


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



