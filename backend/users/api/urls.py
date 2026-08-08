from django.urls import path
from . import views


urlpatterns=[
        path('signup/',views.SignUpView.as_view(),name='create_account'),
        path('verify-email/',views.send_otp,name='verify-detail'),
        path('confirm-otp/',views.confirm_otp,name='confrim_otp'),
        path('login/',views.LoginView.as_view(),name='login_view'),
        path('logout/',views.logout,name='logout-view'),
        path('refresh-token/',views.RefreshTokenView.as_view(),name='refresh_view'),
        path('me/',views.Me.as_view(),name='me_view'),
        ]
