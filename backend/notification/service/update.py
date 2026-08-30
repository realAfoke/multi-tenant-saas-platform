
from django.db import transaction
from notification.api.serializers import NotificationSerializer
from workspace.models import Membership


class NotificationUpdate:
    @staticmethod
    def update(request):
        with transaction.atomic():
            manager=getattr(Membership,'objects')
            member=manager.filter(user=request.user).first()
            notifications=member.notification.exclude(read_by=member)
            for notification in notifications:
                notification.read_by.add(member)
            serialiser=NotificationSerializer(notifications,many=True,context={'request':request})
            return serialiser.data
