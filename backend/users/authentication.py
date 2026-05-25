from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
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

            
