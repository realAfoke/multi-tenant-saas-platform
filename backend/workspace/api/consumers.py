from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import DenyConnection,AcceptConnection
from django.utils.html import json


class ServerRealTimeUpdate(AsyncWebsocketConsumer):
    async def connect(self) -> None:
        # user is member instance not a direct user instance
        self.user=self.scope['user']
        if not self.user.is_authenticated:
            await self.close()
        self.group_name=f'member_{self.user.id}'
        await self.channel_layer.group_add(self.group_name,self.channel_name)
        await self.accept()

    async def send_notification(self,event):
        notification=event['notificaiton']
        await self.send(text_data=json.dumps(notification))
