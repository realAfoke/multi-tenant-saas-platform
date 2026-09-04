from os import getuid
from os.path import exists
from django.db import transaction
from django.db.models import Q, QuerySet
from django.dispatch import receiver
from django.utils.translation import trans_null
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from chat.models import ConnectionRequest, Conversation,Message,MessageReaction,MessageReciept,Attachment
from django.contrib.auth import get_user_model
from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
from workspace.models import Membership
from workspace.models import Membership
from users.api.serializers import UserSerializer
from workspace.api.serializers import ProjectMemberSerializer
from chat.service.message import MessageService
from users.api.serializers import UserSerializer


User=get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    receiver=serializers.SerializerMethodField()
    class Meta:
        model=Conversation
        fields='__all__'

    def get_receiver(self,obj):
        receiver=obj.participants.exclude(user=self.context['request'].user)
        return UserSerializer(receiver,context=self.context).data or None


class MessageSerializer(serializers.ModelSerializer):
    project=serializers.SerializerMethodField()
    workspace=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    sender=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=Message
        fields='__all__'


    @transaction.atomic
    def create(self, validated_data):
        conversation=validated_data.get('conversation',None)
        print('validated_data:',validated_data)
        if not conversation:
            conversation=ChatService.create_conversation(
                    chat_type='direct',
                    participants=[validated_data.get('sender'),validated_data.pop('receiver')]
                    )
        validated_data['conversation']=conversation
        # validated_data.pop('receiver')
        return super().create(validated_data)



    def get_project(self,obj):
        conversation=getattr(obj,'conversation',None)
        project=getattr(conversation,'project',None)
        return project.id if project else None
    def get_workspace(self,obj):
        conversation=getattr(obj,'conversation',None)
        return conversation.worspace if conversation else None


    def get_user(self,obj):
        if obj.conversation and obj.conversation.workspace:
            project_member=obj.conversation.project.project_member.filter(member__user=obj.sender).first()
            return ProjectMemberSerializer(project_member).data
        else:
            return UserSerializer(obj.sender,context=self.context).data


    def validate(self, attrs):
        user=self.context['request'].user
        MessageService.validate_message(
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


