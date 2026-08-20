from django.dispatch import receiver
import manage
from workspace.models import Task
from notification.models import Notification
from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from notification.api.serializers import NotificationSerializer
from asgiref.sync import async_to_sync



@receiver(post_save,sender=Task,dispatch_uid='task_notification')
def send_task_nofitication(sender,instance,created,**kwargs):
    channel=get_channel_layer()
    members=instance.task_member.all()
    manager=getattr(Notification,'objects')
    notification=manager.create(
            title=f'{instance.created_by} assigned you to a task',
            workspace=instance.workspace,
            type='assignment',
            message=instance.description,
            task=instance,

            )
    notification.user.add(*members)
    serializer=NotificationSerializer(notification)
    for member in members:
        async_to_sync(channel.group_send)(f'member_{member.user.user.id}',{'type':'send_notification','notification':serializer.data})



