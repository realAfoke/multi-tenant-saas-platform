from rest_framework import serializers
from billing.models import Plan,Subscription




class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model=Plan
        fields='__all__'
