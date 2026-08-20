from django.dispatch import receiver
import manage
from workspace.models import Task,Comment,Membership
from notification.models import Notification
from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from notification.api.serializers import NotificationSerializer
from asgiref.sync import async_to_sync


def send_notification(members,instance,title):
    channel=get_channel_layer()
    manager=getattr(Notification,'objects')
    notification=manager.create(
            title=title,
            workspace=instance.workspace,
            type='assignment',
            message=getattr(instance,'description',getattr(instance,'content',None)),
            task=getattr(instance,'task',instance),

            )
    notification.user.add(*members)
    serializer=NotificationSerializer(notification)
    for member in members:
        async_to_sync(channel.group_send)(f'member_{member.user.id}',{'type':'send_notification','notification':serializer.data})


@receiver(post_save,sender=Task,dispatch_uid='task_notification')
def send_task_nofitication(sender,instance,created,**kwargs):
    members=instance.task_member.exclude(member=instance.created_by)
    send_notification(members,instance,f'{instance.created_by} assigned you to a task')
    
@receiver(post_save,sender=Comment,dispatch_uid='comment_notificaiton')
def send_comment_notification(sender,instance,created,**kwargs):
    members=Membership.objects.filter(members_task__task=instance.task).exclude(user=instance.user.user)
    send_notification(members,instance,f'{instance.user} assigned you to a task')


