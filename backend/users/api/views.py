from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.services.email_auth import verify_email,verify_otp
from users.services.register import create_user
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
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
            max_age=5*60
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
    key=request.data.get('key')
    value=request.data.get('otp') 
    result=verify_otp(key,value)
    return Response(result)










