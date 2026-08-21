from rest_framework import generics, permissions
from rest_framework.response import Response
from notification.models import Notification
from notification.api.serializers import NotificationSerializer
from workspace.models import WorkSpace



manager=getattr(Notification,'objects')
class NotificationView(generics.ListAPIView):
    queryset=manager.all()
    serializer_class=NotificationSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return manager.filter(user__user=self.request.user,workspace=self.kwargs.get('pk')).order_by('-created_at')


class NotificationUpdateView(generics.UpdateAPIView):
    queryset=manager.all()
    serializer_class=NotificationSerializer
    permission_classes=[permissions.IsAuthenticated]


    def perform_update(self, serializer):
        serializer.save(read=self.request.data.get('read'))

