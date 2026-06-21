from django.urls import path
from . import views


urlpatterns=[
        path('',views.GetPlans.as_view(),name='get_plans'),
        path('plans/',views.create_checkout,name='create_plan'),
        path('webhook/',views.stripe_webhook,name='webhok_view'),
        ]
