from django.db.models.base import transaction
from notification.models import Notification
from rest_framework import serializers
from workspace.models import Membership



manager=getattr(Membership,'objects')
class NotificationSerializer(serializers.ModelSerializer):
    task=serializers.CharField(source='task.title')
    project=serializers.CharField(source='task.project.name')
    read=serializers.SerializerMethodField()
    class Meta:
        model=Notification
        fields='__all__'

    def get_read(self,obj):
        user=self.context['request'].user
        member=manager.filter(user=user).first()
        return True if obj.read_by.filter(user=user).exists() else False


    @transaction.atomic
    def update(self, instance, validated_data):
        if validated_data.pop('read',None) == 'opened':
            user=self.context['request'].user
            member=manager.filter(user=user).first()
            instance.read_by.add(member)
        return super().update(instance,validated_data)

