from django.urls import path
from . import views


urlpatterns=[
        path('workspace/<int:pk>/',views.NotificationView.as_view(),name='notification_view')
        ]
