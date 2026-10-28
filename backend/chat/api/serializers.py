from django.db import transaction
from django.db.models import Q, QuerySet
from django.dispatch import receiver
from django.utils.translation import trans_null
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from chat.models import ConnectionRequest, Conversation,Message,MessageReaction,ChannelReadStatus,Attachment
from django.contrib.auth import get_user_model
from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
from workspace.models import Membership
from workspace.models import Membership
from users.api.serializers import UserSerializer
from workspace.api.serializers import MembershipSerializer, ChannelMemberSerializer
from chat.service.message import MessageService
from users.api.serializers import UserSerializer


User=get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    receiver=serializers.SerializerMethodField()
    participants=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),many=True,write_only=True)
    last_message=serializers.SerializerMethodField()
    status=serializers.SerializerMethodField()
    unread=serializers.SerializerMethodField()
    is_pinned=serializers.SerializerMethodField()
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

    def get_unread(self,obj):
        user=self.context['request'].user
        if obj.chat_type == 'direct' and getattr(obj,'last_read_mssg_id'):
            unread=obj.conversation_message.filter(id__gt=obj.last_read_mssg_id.id).exclude(sender=user) 
            return unread.count() if unread else None
        last_mssg=Message.objects.filter(conversation=obj).order_by('-id').first()
        messages=obj.conversation_message.all()
        if last_mssg and last_mssg.sender == user:
            return None
        last_read=obj.conversation_reciept.filter(user=user).first()
        if last_read and last_read.message:
            return obj.conversation_message.filter(id__gt=last_read.message.id).count()  
        return obj.conversation_message.all().count()

        # return obj.conversation_message.filter(id__gt=last_read.message.id).count() if last_read else obj.conversation_message.all().count()
        #
    def get_is_pinned(self,obj):
        return obj.channel.is_pinned if obj.channel else False

class MessageSerializer(serializers.ModelSerializer):
    channel_id=serializers.SerializerMethodField()
    # workspace=serializers.SerializerMethodField()
    workspace=serializers.SerializerMethodField()
    # user=serializers.SerializerMethodField()
    # sender=serializers.PrimaryKeyRelatedField(read_only=True)
    sender=serializers.SerializerMethodField()
    conversation=serializers.PrimaryKeyRelatedField(queryset=Conversation.objects.all())
    class Meta:
        model=Message
        fields='__all__'


    @transaction.atomic
    def create(self, validated_data):
        message=super().create(validated_data)
        message.conversation.save()
        return message


    def get_channel_id(self,obj):
        conversation=getattr(obj,'conversation',None)
        channel=getattr(conversation,'channel',None)
        return channel.id if channel else None
    def get_sender(self,obj):
        user=obj.sender
        if getattr(obj.conversation,'workspace'):
            member=Membership.objects.filter(user=user).first()
            return MembershipSerializer(member).data
        else:
            return user.id

    def get_workspace(self,obj):
        conversation=getattr(obj,'conversation',None)
        return conversation.workspace.id if conversation.workspace else None


    # def get_user(self,obj):
    #     if obj.conversation and obj.conversation.workspace:
    #         channel_member=obj.conversation.channel.channel_member.filter(member__user=obj.sender).first()
    #         return ChannelMemberSerializer(channel_member).data
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


