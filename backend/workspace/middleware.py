from os import access
from asgiref.sync import async_to_sync
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.utils.html import ValidationError
from rest_framework_simplejwt.tokens import AccessToken
from urllib.parse import parse_qs
from channels.db import database_sync_to_async

User=get_user_model()

class CustomWsAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        headers=dict(scope['headers'])
        cookie_header=headers.get(b'cookie',b'').decode()
        cookies={}
        for cookie in cookie_header.split(';'):
            if '=' in cookie:
                key,value=cookie.split('=')
                cookies[key.strip()]=value.strip()
        token=cookies.get('access')
        access= AccessToken(token)
        if access:
            try:
                user=await self.get_user(access.get('user_id',None))
                scope['user']=user
            except Exception as e:
                raise ValidationError('User not found')
                scope['user']=AnonymousUser()
        else:
            raise ValidationError('Invalid token')
            scope['user']=AnonymousUser()

        return await super().__call__(scope, receive, send)


    @database_sync_to_async
    def get_user(self,token):
        try:
            user=User.objects.get(id=token)
            return user
        except User.DoesNotExist:
            raise ValueError('User does not exist')







# from workspace.models import WorkSpace
# from rest_framework.exceptions import ValidationError
#
#
#
# class WorkSpaceMiddleware:
#
#
#     def __init__(self,get_response):
#         self.get_response=get_response
#
#     def __call__(self,request):
#         response=self.get_response(request)
#         return response
#     def process_view(self,request,view_func,view_args,view_kwargs):
#         try:
#             if hasattr(view_func,'view_class'):
#                 view_name=view_func.view_class.__name__
#             else:
#                 view_name=view_func.__name__
#             workspace=WorkSpace.objects.get(id=view_kwargs.get('pk'))
#             if (not workspace.super_admin == request.user or workspace.admin == request.user) and 'Detail' in view_name:
#                 raise ValidationError('you dont have permission to perform this operation')
#         except WorkSpace.DoesNotExist:
#             raise ValidationError('invalid operation')

