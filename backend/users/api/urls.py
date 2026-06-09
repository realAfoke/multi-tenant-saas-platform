from django.urls import path
from . import views


urlpatterns=[
        path('signup/',views.SignUpView.as_view(),name='create_account'),
        path('verify-email/',views.send_otp,name='verify-detail'),
        path('confirm-otp/',views.confirm_otp,name='confrim_otp'),
        path('login/',views.LoginView.as_view(),name='login_view'),
        # path('profile/',views.Profile.as_view(),name='profile_view'),
        ]
