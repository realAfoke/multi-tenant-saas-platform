from django import dispatch
from django.dispatch import receiver
from django.db.models.signals import post_save,m2m_changed
from workspace import models
# from django.core.mail import send_mail
from django.core.mail import send_mass_mail,send_mail
from django.contrib.auth import get_user_model
 
import logging



logger=logging.getLogger(__name__)
User=get_user_model()



@receiver(post_save,sender=models.Comment,dispatch_uid='send_task_update')
def send_task_update(sender,instance,created,**kwargs):
    if instance:
            messages=[(f'Update on task {instance.task.title.upper()}',f'{instance.user.email} drop an update on the task go check it out','noreply@example.com',[email]) for email in instance.task.members.all().exclude(id=instance.user.id).values_list('email',flat=True)]
            send_mass_mail(messages)
        # send_mail(
        #         f'Update on task {instance.task.title}',
        #         f'''
        #         {instance.user.first_name} {instance.user.last_name} drop an update on the task go check it out
        #         ''',
        #         'noreply@example.com',instance.task.members.all().values_list('email',flat=True)
        #         )

# @receiver(post_save,sender=models.TaskMember,dispatch_uid='task_member_signal')
# def task_member(sender,instance,created,**kwargs):
#     if created:
#         send_mail(
#                 f'You\'ve been added to a Task',
#                 f'You were added as member to {instance.title.upper()}',
#                 'noreply@example.com',
#                 [instance.email],
#
#                 )
#
    # message=[
    #         (
    #             f'You\'ve been added to a Task',
    #             f'You were added as member to {instance.title.upper()}',
    #             'noreply@example.com',
    #             [user.email]
    #             )
    #         for user in users if user.email
    #         ]
    # try:
    #     if message:
    #         send_mass_mail(message,fail_silently=False)
    # except Exception as e:
    #     logger.exception(e)


# @receiver(m2m_changed,sender=models.Task.admins.through)
# def members_add(sender,instance,action,pk_set,**kwargs):
#     users=User.objects.filter(pk__in=pk_set)
#     action=None
#     if action == 'post_add':
#         action='added'
#     elif action == 'post_remove':
#         action ='removed'
#     message=[(f'You\'ve been {action} to Project',f'You were {action} as admin to {instance.name.upper()}','noreply@example.com',[user.email]) for user in users]
#
#
#     send_mass_mail(message)

