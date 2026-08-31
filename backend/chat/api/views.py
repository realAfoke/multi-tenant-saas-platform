from asyncio import gather
from rest_framework import generics
from rest_framework.response import Response
from chat.models import ConnectionRequest, Conversation, Message
from chat.service.chat import ChatService
import manage
from . serializers import MessageSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser,FormParser



class GetChannelMessages(generics.ListAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    serializer_class=MessageSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return self.manager.filter(conversation__project=self.kwargs.get('pk')).order_by('-timestamp')


class GetDirectChataMessages(generics.ListAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    serializer_class=MessageSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return self.manager.filter(conversation=self.kwargs.get('pk')).order_by('-timestamp')

class MediaFileMessage(generics.CreateAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    permission_classes=[permissions.IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]

