from django.urls import URLPattern, path
from . import views

urlpatterns=[
        path('discussion/<int:pk>/',views.GetDiscussionMessages.as_view()),
        ]
