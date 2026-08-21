from notification.models import Notification
from rest_framework import serializers
from workspace.models import Membership



class NotificationSerializer(serializers.ModelSerializer):
    task=serializers.CharField(source='task.title')
    project=serializers.CharField(source='task.project.name')
    read=serializers.SerializerMethodField()
    class Meta:
        model=Notification
        fields='__all__'

    def get_read(self,obj):
        user=self.context['request'].user
        manager=getattr(Membership,'objects')
        member=manager.filter(user=user).first()
        return True if obj.read.filter(user=user).exists() else False

