from django.contrib.auth.backends import ModelBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from typing import Optional
from rest_framework_simplejwt.authentication import AuthUser
from rest_framework_simplejwt.tokens import Token
import re

UserModel=get_user_model()


class CustomAuthentication(ModelBackend):
    # def authenticate(self, request, email=None,phone=None password=None, **kwargs):
    def authenticate(self, request, username=None, password=None, **kwargs):
        email=kwargs.get('email',username)
        phone=kwargs.get('phone',username)
        if not password or len(password.strip()) == 0:
            raise ValidationError('Invalid credentails')
        try:
            if email is None and phone is None:
                raise ValidationError({'invalid_credentials':'login details were not provided'})
            if email:
                pattern=r'^[a-zA-Z0-9_+%-\.]+@[a-zA-Z0-9_%+-\.]+\.[a-zA-Z]{2,}$'
                is_valid=re.match(pattern,email)
                if not is_valid:
                    raise ValidationError('provided credential not valid')
                user=UserModel.objects.get(email=email)
            else:
                user=UserModel.objects.get(phone=phone)
        except UserModel.DoesNotExist:
            return None
            # raise ValidationError({'Invalid_credentials':'provided details are invalid'})
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        else:
            raise ValidationError({'Invalid_credentials':'provided details are invalid'})


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request: Request) -> Optional[tuple[AuthUser, Token]]:
        token=request.COOKIES.get('access')
        if token is None:
            return None
        try:
            validated_token=self.get_validated_token(token)
            return self.get_user(validated_token),validated_token
        except Exception as e:
            print('TOKEN VALIDATION:',str(e))
            return None

            
