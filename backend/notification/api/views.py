from rest_framework import generics, permissions
from rest_framework.response import Response
from notification.models import Notification
from notification.api.serializers import NotificationSerializer
from workspace.models import WorkSpace



class NotificationView(generics.ListAPIView):
    queryset=Notification.objects.all()
    serializer_class=NotificationSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        manager=getattr(Notification,'objects')
        return manager.filter(user__user__in=self.request.user,workspace=self.kwargs.get('pk')).order_by('-created_at')[:20]
