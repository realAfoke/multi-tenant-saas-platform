from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import DenyConnection,AcceptConnection
from django.utils.html import json
from urllib.parse import parse_qs
from chat.service.chat import process_chat
from asgiref.sync import sync_to_async


class ServerRealTimeUpdate(AsyncWebsocketConsumer):
    async def connect(self) -> None:
        # user is member instance not a direct user instance
        scope=getattr(self,'scope')
        self.user=scope['user']
        if not self.user.is_authenticated:
            await self.close()

        query=parse_qs(scope['query_string'].decode())
        workspaces=query.get('workspaces',[])
        self.workspace_ids=workspaces[0].split(",")

        self.group_name=f'member_{getattr(self.user,"id")}'
        await self.channel_layer.group_add(self.group_name,self.channel_name)

        for id in self.workspace_ids:
            self.group_name=f'workspace_{id}'
            await self.channel_layer.group_add(self.group_name,self.channel_name)

        await self.accept()


    async def receive(self, text_data: str | None = None, bytes_data: bytes | None = None) -> None:
        received_data=json.loads(text_data)
        chat=await sync_to_async(process_chat)(received_data,self.user)
        await self.channel_layer.group_send(f'workspace_{chat["workspace"]}',{'type':'send.d','discussion':chat})


    async def send_d(self,event):
        discuss=event['discussion']
        await self.send(text_data=json.dumps(discuss))

    async def send_notification(self,event):
        notification=event['notification']
        await self.send(text_data=json.dumps(notification))




