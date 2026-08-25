from django import dispatch
from django.dispatch import receiver
from django.db.models.signals import post_save,m2m_changed
from workspace import models
# from django.core.mail import send_mail
from django.core.mail import send_mass_mail,send_mail
from django.contrib.auth import get_user_model
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
 
import logging

import workspace
from workspace.api.serializers import ActivityLogSerializer



logger=logging.getLogger(__name__)
User=get_user_model()



@receiver(post_save,sender=models.Comment,dispatch_uid='send_task_update')
def send_task_update(sender,instance,created,**kwargs):
    members=instance.task.task_member.all().exclude(member=instance.user)
    if instance:
            messages=[(
                f'Update on task {instance.task.title.upper()}',
                f'{instance.user.user.first_name} {instance.user.user.last_name} drop an update on the task go check it out',
                'noreply@example.com',
                [member.member.user.email]
                )
                      for member in members]
            send_mass_mail(messages)


@receiver(post_save,sender=models.Project,dispatch_uid='unique_project_activity')
def send_project_activity(sender,instance,created,**kwargs):
    channel=get_channel_layer()
    if created:
        member=instance.created_by.user
        serializer=ActivityLogSerializer(data={
            'workspace':instance.workspace,
            'project':instance,
            'action':'created',
            'member':instance.created_by,
            'message':f'A new project was created by {member.first_name} {member.last_name}'

            })
        serializer.is_valid(raise_exception=True)
        serializer.save()
        async_to_sync(channel.group_send)(f'workspace_{instance.workspace.id}',{'type':'send.activity','activity':serializer.data})
       
