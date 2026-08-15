from os import write
from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework.exceptions import AuthenticationFailed
from typing import Any
from django.core.cache import cache
from rest_framework.exceptions import ValidationError
from workspace.models import WorkSpace,Membership
import logging
from workspace.api.serializers import MembershipSerializer



User=get_user_model()

logger=logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    workspace=serializers.CharField(write_only=True,required=False)
    first_name=serializers.CharField(required=True)
    last_name=serializers.CharField(required=True)
    email=serializers.EmailField(required=True)
    # membership=serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=['id','password','email','phone','first_name','last_name','username','workspace','created_on','updated_on']

    def create(self, validated_data):
        if validated_data.get('_existing',None):
            return validated_data['_existing']
        workspace=validated_data.pop('workspace',None)
        user=User.objects.create_user(**validated_data)
        if workspace:
            workspace=workspace(name=workspace)
            workspace.save()
            memb=Membership(workspace=workspace,user=user,role='owner')
            memb.save()
        return user

    # def get_membership(self,obj):
    #     user=self.context['request'].user
    #     memberships=user.user_membership.all()
    #     return [{'id':member.id,'role':member.role,'workspace':member.workspace.name} for member in memberships]
    #
    def validate(self, attrs):
        if 'email' not in attrs and 'phone' not in attrs:
            raise ValueError('credentials not provided')
        user_detail=attrs.get('email') or attrs.get('phone')
        _existing=User.objects.filter(email=user_detail).first()
        if _existing:
            attrs['_existing']=_existing
            return attrs
        if not cache.get(f'confirm:{user_detail}'): 
            raise ValidationError(f'{user_detail} is not verified ')
        return attrs


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        user=authenticate(request=self.context['request'],**attrs)
        if not user:
            # raise ValidationError('invalide credentials')
            raise AuthenticationFailed('Invalid credentials')
        refresh=self.get_token(user)
        user=UserSerializer(user).data
        user['refresh']=str(refresh)
        user['access']=str(refresh.access_token)
        return user


