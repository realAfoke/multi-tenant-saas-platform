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
from chat.api.serializers import MessageSerializer
from channels.db import database_sync_to_async
from django.db.models import Q
from chat.models import ConnectionRequest

from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
import workspace



User=get_user_model()
class Request:
    def __init__(self,user):
        self.user=user

class ServerRealTimeUpdate(AsyncWebsocketConsumer):
    async def connect(self) -> None:
        # user is member instance not a direct user instance
        scope=getattr(self,'scope')
        self.user=scope['user']
        if not self.user.is_authenticated:
            await self.close()
            return

        query=parse_qs(scope['query_string'].decode())
        workspaces=query.get('workspaces',[])
        self.workspace_ids=workspaces[0].split(",")

        self.group_name=f'user_{self.user.id}'
        await self.channel_layer.group_add(self.group_name,self.channel_name)

        for id in self.workspace_ids:
            self.group_name=f'workspace_{id}'
            await self.channel_layer.group_add(self.group_name,self.channel_name)

        await self.accept()


    async def receive(self, text_data: str | None = None, bytes_data: bytes | None = None) -> None:
        received_data=json.loads(text_data)
        receiver_id=received_data.get('receiver',None)
        validated_message=await self.validate_conversation(received_data)
        message=await self.serialize_data(received_data)
        workspace=message.get('workspace',None)
        if workspace:
            await self.channel_layer.group_send(f"workspace_{workspace}",{"type":"send.message","message":message})
        else:
            await self.channel_layer.group_send(f'user_{receiver_id}',{'type':'send.message','message':message})

    @database_sync_to_async
    def serialize_data(self,data):
        with transaction.atomic():
            request=Request(self.user)
            serializer=MessageSerializer(data=data,context={'request':request})
            serializer.is_valid(raise_exception=True)
            serializer.save(sender=self.user)
            return serializer.data


    async def send_message(self,event):
        message=event['message']
        await self.send(text_data=json.dumps(message))

    async def send_notification(self,event):
        notification=event['notification']
        await self.send(text_data=json.dumps(notification))

    async def send_activity(self,event):
        activity=event['activity']
        await self.send(text_data=json.dumps(activity))

    @sync_to_async
    def validate_conversation(self, message):
        with transaction.atomic():
            conversation_id = message.get('conversation')

            if conversation_id:
                conversation = self.user.conversation.filter(
                    id=conversation_id
                ).first()

                if conversation is None:
                    raise ValidationError("Conversation does not exist.")

                connection = ConnectionRequest.objects.filter(
                    conversation=conversation
                ).first()

                if connection is None:
                    raise ValidationError(
                        "This conversation has no connection request."
                    )
                ConnectionRequestService.create_accept_request(sender=self.user)
            else:
                receiver_id = message.pop('receiver', None)

                if not receiver_id:
                    raise ValidationError('Recipient id is not sent.')

                receiver = User.objects.filter(id=receiver_id).first()

                if receiver is None:
                    raise ValidationError('Recipient does not exist.')

                conversation=ConnectionRequestService.create_accept_request(sender=self.user,recipient=receiver)
            print('CONVERSATION:',conversation)
            message['conversation'] = conversation.id
            return message

