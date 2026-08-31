from django.urls import URLPattern, path
from . import views

urlpatterns=[
        path('discussion/<int:pk>/',views.GetChannelMessages.as_view()),
        path('<int:pk>/messages',views.GetDirectChataMessages.as_view()),
        path('send-connection-request/',views.DirectConnectionRequestView.as_view()),
        ]
