from django.urls import path

from workspace.models import WorkSpace
from . import views


urlpatterns=[
        path('workspace/<int:pk>/',views.NotificationView.as_view(),name='notification_view'),
        path('<int:pk>/detail/',views.NotificationUpdateView.as_view())
        ]
