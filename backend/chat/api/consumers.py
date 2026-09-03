from logging import raiseExceptions
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import DenyConnection,AcceptConnection
from django.core.serializers import serialize
from django.http import request
from django.utils.html import json
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from chat.api.serializers import MessageSerializer
from channels.db import database_sync_to_async

import workspace



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
        receiver_id=received_data.pop('receiver',None)
        message=await self.serialize_data(received_data)
        workspace=message['workspace']
        if workspace:
            await self.channel_layer.group_send(f"workspace_{workspace}",{"type":"send.message","message":message})
        else:
            await self.channel_layer.group_send(f'user_{receiver_id}',{'type':'send.message','message':message})

    @database_sync_to_async
    def serialize_data(self,data):
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




