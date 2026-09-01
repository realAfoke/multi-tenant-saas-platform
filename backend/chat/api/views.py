from asyncio import gather
from django.contrib.auth import get_user_model
from django.http import request
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from chat.models import ConnectionRequest, Conversation, Message
from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
import manage
from . serializers import MessageSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser,FormParser


User=get_user_model()


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


class DirectConnectionRequestView(APIView):
     permission_classes=[permissions.IsAuthenticated]
     def post(self,request,*args,**kwargs):
         ConnectionRequestService.send_request(iniciater=request.user,receiver=request.data.get('receiver'))
         return Response({'status':'request sent.'})

class SearchUserView(generics.ListAPIView):
    manager=getattr(User,'objects')
    queryset=manager.all()
    permission_classes=[permissions.IsAuthenticated]

    def filter_queryset(self, queryset): 
        return manager.filter(self.request.query_params.keys()[0]__in=self.request.query_params.values()[0])





