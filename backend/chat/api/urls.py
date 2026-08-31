from django.urls import URLPattern, path
from . import views

urlpatterns=[
        path('discussion/<int:pk>/',views.GetChannelMessages.as_view()),
        ]
