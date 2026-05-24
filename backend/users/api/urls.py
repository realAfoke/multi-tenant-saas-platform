from django.urls import path
from . import views


urlpatterns=[
        path('create/',views.create_account,name='create_account'),
        path('verify-details/',views.send_otp,name='verify-detail'),
        path('confirm-otp/',views.confirm_otp,name='confrim_otp'),
        ]
