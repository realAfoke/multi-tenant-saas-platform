from rest_framework import generics
from rest_framework.response import Response
from chat.models import Message
import manage
from . serializers import MessageSerializer
from rest_framework import permissions



class GetDiscussionMessages(generics.ListAPIView):
    manager=getattr(Message,'objects')
    queryset=manager.all()
    serializer_class=MessageSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return self.manager.filter(conversation__project=self.kwargs.get('pk')).order_by('-timestamp')
