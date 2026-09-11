from django.contrib.auth import get_user_model
from django.http import request
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from chat.models import ConnectionRequest, Conversation, Message
from chat.service.chat import ChatService
from chat.service.connection_request import ConnectionRequestService
from . serializers import ConnectionRequestSerializer, ConversationSerializer, MessageSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser,FormParser
from django.db.models import Q
from users.api.serializers import UserSerializer


User=get_user_model()


# class GetChannelMessages(generics.ListAPIView):
#     manager=getattr(Message,'objects')
#     queryset=manager.all()
#     serializer_class=MessageSerializer
#     permission_classes=[permissions.IsAuthenticated]
#
#     def get_queryset(self):
#         return self.manager.filter(conversation__project=self.kwargs.get('pk')).order_by('-timestamp')
#


class GetConversationView(generics.ListAPIView):
    manager=getattr(Conversation,'objects')
    queryset=manager.all()
    serializer_class=ConversationSerializer
    permission_classes=[permissions.IsAuthenticated]


    def get_queryset(self):
        return self.manager.filter(participants=self.request.user).order_by('-created_at')


class GetMessages(generics.ListAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    serializer_class=MessageSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return self.manager.filter(conversation=self.kwargs.get('pk')).order_by('timestamp')

class MediaFileMessage(generics.CreateAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    permission_classes=[permissions.IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]


class DirectConnectionRequestView(generics.ListCreateAPIView):
    manager=getattr(ConnectionRequest,'objects')
    queryset=manager.all()
    serializer_class=ConnectionRequestSerializer
    permission_classes=[permissions.IsAuthenticated]

class SearchUserView(generics.ListAPIView):
    manager=getattr(User,'objects')
    queryset=manager.all()
    serializer_class=UserSerializer
    permission_classes=[permissions.IsAuthenticated]

    def filter_queryset(self, queryset): 
        search_param=self.request.query_params.get('search')
        print('search:',search_param)
        return self.manager.filter(Q(first_name__icontains=search_param) | Q(last_name__icontains=search_param) | Q(username__icontains=search_param))









