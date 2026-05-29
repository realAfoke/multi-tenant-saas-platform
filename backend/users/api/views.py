from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from users.services.auth import verify_email,verify_otp
from users.services.register import create_user
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from typing import cast

# Create your views here.


User=get_user_model()


@api_view(['POST'])
def create_account(request):
    user=create_user(request)
    refresh=RefreshToken.for_user(user['user'])
    response=Response({'user':user['data']})
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



