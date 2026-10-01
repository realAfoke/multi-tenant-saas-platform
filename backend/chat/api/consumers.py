from http.client import ImproperConnectionState
from logging import raiseExceptions
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import DenyConnection,AcceptConnection
from django.contrib.auth import get_user_model
from django.core.serializers import serialize
from django.db import transaction
from django.dispatch import receiver
from django.forms import ValidationError
from django.http import request
from django.utils.html import json
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from chat.api.serializers import ConversationSerializer, MessageSerializer
from channels.db import database_sync_to_async
from django.db.models import Q
from chat.models import ConnectionRequest, Conversation

from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
from chat.service.consumer import ConsumerService
import workspace
from workspace.models import Membership, WorkSpace
import pprint



User=get_user_model()
class Request:
    def __init__(self,user):
        self.user=user

class ServerRealTimeUpdate(AsyncWebsocketConsumer):
    async def connect(self) -> None:
        # user is member instance not a direct user instance
        scope=getattr(self,'scope')
        self.user=scope['user']
        print('self user:',self.user)
        if not self.user.is_authenticated:
            await self.close()
            return

        workspaces=await sync_to_async(lambda:list(WorkSpace.objects.filter(membership__user=self.user)))()
        conversations=await sync_to_async(lambda:list(Conversation.objects.filter(participants=self.user)))()

        if workspaces:
            for workspace in workspaces:
                self.workspace_group=f'workspace_{workspace.id}'
                await self.channel_layer.group_add(self.workspace_group,self.channel_name)

        if conversations:
            for conversation in conversations:
                self.conversation_group=f'conversation_{conversation.id}'
                await self.channel_layer.group_add(self.conversation_group,self.channel_name)

        self.group_name=f'user_{self.user.id}'
        await self.channel_layer.group_add(self.group_name,self.channel_name)
        await self.accept()


    async def receive(self, text_data: str | None = None, bytes_data: bytes | None = None) -> None:
        received_data=json.loads(text_data)
        # print('RECEIVED DATA:',received_data)
        receiver_id=received_data.get('receiver',None)
        await self.validate_conversation(received_data)

        message=await self.serialize_data(received_data)
        if message is None:
            return

        workspace= message.get('workspace',None)
        if workspace:
            if received_data.get('status') in ['seen','received']:
            #     user_group=f'user_{self.user.id}'
            #     await self.channel_layer.group_send(user_group,{'type':'send.message','message':message})
                return
            group_name=f"workspace_{workspace}"
            await self.channel_layer.group_send(
                    group_name,
                    {
                        "type":"send.message",
                        "message":message
                        }
                    )
        else:
            #broadcast back to sender server has received and sent messg
            if message['tag'] == 'conversation':
                await self.channel_layer.group_send(self.group_name,{'type':'send.message','message':message})
                return
            conversation_id=message.get('conversation') or message.get('id')
            await self.channel_layer.group_send(f'conversation_{conversation_id}',{'type':'send.message','message':message})


    @database_sync_to_async
    def serialize_data(self,data):
        with transaction.atomic():
            request=Request(self.user)
            if data.get('status') in ['seen','received']:
                conversation=ConsumerService.update_message_status(data,self.user)
                if conversation:
                    serializer=ConversationSerializer(conversation,context={'request':request})
                    conversation=serializer.data
                    conversation['tag']='conversation'
                    return conversation
                return None

            serializer=MessageSerializer(data=data,context={'request':request})
            serializer.is_valid(raise_exception=True)
            serializer.save(sender=self.user,client_id=data.get('clientId'))
            message=serializer.data
            message['tag']='message'
            return message


    async def send_message(self,event):
        message=event['message']
        await self.send(text_data=json.dumps(message))

    async def send_channel(self,event):
        channel=event['channel']
        channel['tag']='channel'
        await self.send(text_data=json.dumps(channel))


    async def send_notification(self,event):
        notification=event['notification']
        notification['tag']='notification'
        await self.send(text_data=json.dumps(notification))

    async def send_activity(self,event):
        activity=event['activity']
        await self.send(text_data=json.dumps(activity))

    @sync_to_async
    def validate_conversation(self, message):
        with transaction.atomic():
            conversation_id = message.get('conversation')
            if conversation_id:
                conversation = Conversation.objects.filter(
                    id=conversation_id
                ).first()

                if conversation is None:
                    raise ValidationError("Conversation does not exist.")

                connection = ConnectionRequest.objects.filter(
                    conversation=conversation
                ).first()

                if not hasattr(conversation,'channel') and connection is None:
                    raise ValidationError(
                        "This conversation has no connection request."
                    )
                if hasattr(conversation,'channel'):
                    return

                ConnectionRequestService.create_accept_request(sender=self.user)
            else:
                receiver_id = message.pop('receiver', None)

                if not receiver_id:
                    raise ValidationError('Recipient id is not sent.')

                receiver = User.objects.filter(id=receiver_id).first()

                if receiver is None:
                    raise ValidationError('Recipient does not exist.')

                conversation=ConnectionRequestService.create_accept_request(sender=self.user,recipient=receiver)
            message['conversation'] = conversation.id
            return message

