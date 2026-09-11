from enum import member
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
from workspace.api.serializers import MembershipSerializer, ProjectMemberSerializer
from chat.service.message import MessageService
from users.api.serializers import UserSerializer


User=get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    receiver=serializers.SerializerMethodField()
    participants=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),many=True,write_only=True)
    last_message=serializers.SerializerMethodField()
    status=serializers.SerializerMethodField()
    class Meta:
        model=Conversation
        fields='__all__'

    def get_receiver(self,obj):
        receiver=obj.participants.exclude(id=self.context['request'].user.id).first()
        return UserSerializer(receiver,context=self.context).data if receiver else None

    def get_last_message(self,obj):
        message= obj.conversation_message.all().order_by('-timestamp').first() or None
        return MessageSerializer(message,context=self.context).data if message else None

    def get_status(self,obj):
        # connection=ConnectionRequest.objects.filter(conversation=obj).first()
        connection=getattr(obj,'conversation_status',None)
        return connection.status if connection else None


class MessageSerializer(serializers.ModelSerializer):
    project=serializers.SerializerMethodField()
    # workspace=serializers.SerializerMethodField()
    workspace=serializers.PrimaryKeyRelatedField(read_only=True)
    # user=serializers.SerializerMethodField()
    # sender=serializers.PrimaryKeyRelatedField(read_only=True)
    sender=serializers.SerializerMethodField()
    conversation=serializers.PrimaryKeyRelatedField(queryset=Conversation.objects.all())
    class Meta:
        model=Message
        fields='__all__'


    def get_project(self,obj):
        conversation=getattr(obj,'conversation',None)
        project=getattr(conversation,'project',None)
        return project.id if project else None
    def get_sender(self,obj):
        user=obj.sender
        if getattr(obj.conversation,'workspace'):
            member=Membership.objects.filter(user=user).first()
            return MembershipSerializer(member).data
        else:
            return user.id

    # def get_workspace(self,obj):
    #     conversation=getattr(obj,'conversation',None)
    #     return conversation.workspace if conversation else None
    #

    # def get_user(self,obj):
    #     if obj.conversation and obj.conversation.workspace:
    #         project_member=obj.conversation.project.project_member.filter(member__user=obj.sender).first()
    #         return ProjectMemberSerializer(project_member).data
    #     else:
    #         return UserSerializer(obj.sender,context=self.context).data
    #

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


