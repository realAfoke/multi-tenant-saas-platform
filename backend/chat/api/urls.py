from django.urls import URLPattern, path
from . import views

urlpatterns=[
        path('<int:pk>/messages',views.GetMessages.as_view()),
        path('send-connection-request/',views.DirectConnectionRequestView.as_view()),
        path('search-friend/',views.SearchUserView.as_view()),
        ]
