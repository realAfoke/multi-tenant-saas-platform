from os import getuid
from os.path import exists
from django.db.models import Q, QuerySet
from django.dispatch import receiver
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from chat.models import ConnectionRequest, Conversation,Message,MessageReaction,MessageReciept,Attachment
from django.contrib.auth import get_user_model
from chat.service.connection_request import ConnectionRequestService
from workspace.models import Membership
from users.api.serializers import UserSerializer
from workspace.api.serializers import ProjectMemberSerializer
from chat.service.message import MessageService


User=get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    project=serializers.SerializerMethodField()
    workspace=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    class Meta:
        model=Message
        fields='__all__'

    def get_project(self,obj):
        return obj.conversation.project.id if obj.conversation.project else None
    def get_workspace(self,obj):
        return obj.conversation.workspace.id if obj.conversation.workspace else None
    def get_user(self,obj):
        if obj.conversation.workspace:
            project_member=obj.conversation.project.project_member.filter(member__user=obj.sender).first()
            return ProjectMemberSerializer(project_member).data
        else:
            return UserSerializer(obj.sender).data
    def validate(self, attrs):
        user=self.context['request'].user
        MessageService.validate_messae(
                user=user,
                conversation_id=attrs.get('conversation_id'),
                receiver=attrs.get('receiver')
                )
        return attrs

class ConnectionRequestSerializer(serializers.ModelSerializer):
    sender=serializers.PrimaryKeyRelatedField(read_only=True)

    recipient=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model=ConnectionRequest
        fields='__all__'


    def create(self, validated_data):
        user=self.context['request'].user
        connection=ConnectionRequestService.send_request(sender=user,recipient=validated_data.get('recipient'))

        return connection


