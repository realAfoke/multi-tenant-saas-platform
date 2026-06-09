from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework.exceptions import AuthenticationFailed
from typing import Any
from django.core.cache import cache
from rest_framework.exceptions import ValidationError


User=get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['id','password','email','phone','first_name','last_name','username']
        read_only_fields=['phone','first_name','last_name','username']

    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user

    def validate(self, attrs):
        if 'email' not in attrs and 'phone' not in attrs:
            raise ValueError('credentials not provided')
        user_detail=attrs.get('email') or attrs.get('phone')
        if not cache.get(f'confirm:{user_detail}'): 
            raise ValidationError(f'{user_detail} is not verified ')
        return attrs


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        user=authenticate(request=self.context['request'],**attrs)
        if not user:
            raise AuthenticationFailed('Invalid credentials')
        refresh=self.get_token(user)
        user=UserSerializer(user).data
        user['refresh']=str(refresh)
        user['access']=str(refresh.access_token)
        return user


