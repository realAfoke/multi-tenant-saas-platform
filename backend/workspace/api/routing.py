from django.urls import path
from . import consumers

websocket_urlpatterns=[
        path('ws/user/',consumers.ServerRealTimeUpdate.as_asgi(),name='real_time')
        ]
