"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os
from channels.generic import websocket
from dotenv import load_dotenv

load_dotenv()


# os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.base')

os.environ.setdefault('DJANGO_SETTINGS_MODULE',os.getenv('DJANGO_SETTINGS_MODULE','config.settings.dev'))

from django.core.asgi import get_asgi_application
django_asgi_app= get_asgi_application()
from channels.routing import ProtocolTypeRouter,URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddleware
from workspace.api.routing import websocket_urlpatterns
from workspace.middleware import CustomWsAuthMiddleware



application=ProtocolTypeRouter({
    'http':django_asgi_app,
    'websocket':AllowedHostsOriginValidator(CustomWsAuthMiddleware(URLRouter(websocket_urlpatterns)))
    })


