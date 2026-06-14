from django.dispatch import receiver
from django.db.models.signals import post_save
from workspace import models
from django.core.mail import send_mail
from django.core.mail import send_mass_mail




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

