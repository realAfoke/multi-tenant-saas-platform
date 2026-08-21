from notification.models import Notification
from rest_framework import serializers



class NotificationSerializer(serializers.ModelSerializer):
    task=serializers.CharField(source='task.title')
    project=serializers.CharField(source='task.project.name')
    class Meta:
        model=Notification
        fields='__all__'

