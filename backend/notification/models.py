from django.core.checks import messages
from django.db import models
from workspace.models import Membership,WorkSpace,Task

# Create your models here.
#
#

class Notification(models.Model):
    title=models.CharField(max_length=500)
    # user=models.ForeignKey(Membership,related_name='nofication',on_delete=models.CASCADE)
    user=models.ManyToManyField(Membership,related_name='notification')
    workspace=models.ForeignKey(WorkSpace,related_name="workspace_notification",on_delete=models.CASCADE)
    type=models.CharField(max_length=250)
    task=models.ForeignKey(Task,related_name='task_notification',on_delete=models.SET_NULL,null=True,blank=True)
    related_user=models.ForeignKey(Membership,related_name='related_notification',on_delete=models.SET_NULL,null=True,blank=True)
    message=models.TextField()
    read_by=models.ManyToManyField(Membership,related_name='read_member')
    created_at=models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table='notification'

    def __str__(self):
        return self.title


