from urllib.parse import urlencode
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import generics, permissions,status
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from users.services.auth import verify_email,verify_otp
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from users.api.serializers import UserSerializer,LoginSerializer
import logging
from workspace.api.serializers import MembershipSerializer
from workspace.models import Membership
from django.core.cache import cache
import os
from dotenv import load_dotenv
import secrets
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Create your views here.


load_dotenv()
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

        # def get_object(self):
        #     user=self.request.user
        #     member=Membership.objects.filter(user=user).first()
        #     return member
        #
        #

class GetUserView(generics.RetrieveAPIView):
        queryset=User.objects.all()
        serializer_class=UserSerializer
        permission_classes=[permissions.IsAuthenticated]

class SendRestPasswordLinkView(APIView):
        def post(self,request,*args,**kwargs):
                token_generator=PasswordResetTokenGenerator()
                email=request.data.get('email')
                if email is None:
                        raise DRFValidationError("email is required")
                user=User.objects.filter(email=email).first()
                if user:
                        token=token_generator.make_token(user)
                        # token=secrets.token_urlsafe(32)
                        query_params={"token":token,"uid":user.id}
                        link=(f'{os.getenv("CLIENT","https://localhost:5173")}'f'/reset-password?{urlencode(query_params)}')
                        # cache.set(f"reset_{user.email}",token,60*30)
                        send_mail("Reset your password",f"""
                                  We received a request to reset the password associatd with your account.
                                  Click the button below to create a new password:
                                  [Reset Password]({link})
                                  the link will expire in 30 minutes
                                  if you did'nt request for a password reset kindly ignore this email.Your password will remain unchanged
                                  Best regards
                                  Nexflux
                                  """,'noreply@ighoreality.cyou',[user.email])
                return Response({"status":"A reset link has been sent to your email"})

class ChangePassword(APIView):
        def patch(self,request,*args,**kwargs):
                token_generator=PasswordResetTokenGenerator()
                token=request.data.get('token')
                pk=request.data.get('id')
                password=request.data.get('password')
                if not all([pk,token,password]):
                        raise DRFValidationError("id,token and password are required")
                try:
                        user=User.objects.get(id=pk)
                except User.DoesNotExist:
                        raise DRFValidationError("Invalid password reset link")
                if not token_generator.check_token(user,token):
                        raise DRFValidationError("Invalid reset link")
                try:
                        validate_password(password,user)
                except DjangoValidationError as e:
                        raise DRFValidationError({"password":e.messages})
                user.set_password(password)
                user.save()
                return Response({"message":"password changed successfully"})
