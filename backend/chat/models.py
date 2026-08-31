from email.mime import message
from operator import mod
from os.path import realpath
from django.db import models
from django.db.models import constraints
from django.utils import choices
from django.contrib.auth import get_user_model
from workspace.models import Project,WorkSpace


# Create your models here.
#
#
#
#
User=get_user_model()

class Conversation(models.Model):
    chat_type=models.CharField(max_length=200,choices=[('Project','project'),('Individual','individual')])
    name=models.CharField(max_length=300)
    conversation_id=models.UUIDField(editable=False,null=True,blank=True)
    workspace=models.ForeignKey(WorkSpace,related_name='workspace_conversation',on_delete=models.CASCADE,null=True,blank=True)
    project=models.ForeignKey(Project,related_name='project_conversation',on_delete=models.CASCADE,null=True,blank=True)
    participants=models.ManyToManyField(User,related_name='conversation')
    last_read_mssg_id=models.ForeignKey('Message',related_name='lst_read_msg_id',on_delete=models.CASCADE,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        db_table='conversation'

    def __str__(self):
        return self.name


class Message(models.Model):
    sender=models.ForeignKey(User,related_name='message',on_delete=models.CASCADE)
    content=models.TextField()
    conversation=models.ForeignKey(Conversation,related_name='conversation_message',on_delete=models.CASCADE)
    client_id=models.UUIDField(editable=False,null=True,blank=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    is_edited=models.BooleanField(default=False)

    class Meta:
        db_table='message'



    def __str__(self):
        return self.content


class MessageReciept(models.Model):
    user=models.ForeignKey(User,related_name='user_reciept',on_delete=models.CASCADE)
    message=models.ForeignKey(Message,related_name='message_reciept',on_delete=models.CASCADE)
    conversation=models.ForeignKey(Conversation,related_name='conversation_reciept',on_delete=models.CASCADE)
    status=models.CharField(max_length=200,choices=[('delivered','Delivered'),('read','Read'),('inactive','Inactive')])
    timestamp=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table='message_reciept'
        unique_together=('message','user')

    def __str__(self):
        return self.status

class Attachment(models.Model):
    message=models.ForeignKey(Message,related_name='attachement',on_delete=models.CASCADE)
    attachemnt=models.FileField(upload_to='files',null=True,blank=True)
    type=models.CharField(max_length=100,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        db_table='attachment'

    def __str__(self):
        return self.attachemnt


class MessageReaction(models.Model):
    user=models.ForeignKey(User,related_name='user_reaction',on_delete=models.CASCADE)
    message=models.ForeignKey(Message,related_name='message_reaction',on_delete=models.CASCADE)
    conversation=models.ForeignKey(Conversation,related_name='conversation_reaction',on_delete=models.CASCADE)
    reaction=models.CharField(max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table='message_reaction'
        constraints=[
                models.UniqueConstraint(
                fields=['user','message'],
                name='unique_msg_reaction'
                )
                ]

    def __str__(self):
        return self.reaction

class ConnectionRequest(models.Model):
    iniciater=models.ForeignKey(User,related_name='request_iniciater',on_delete=models.CASCADE)
    accepter=models.ForeignKey(User,related_name='request_accepter',on_delete=models.CASCADE)
    status=models.CharField(max_length=200,default='pending')
    timestamp=models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table='connection_request'
        constraints=[
                models.UniqueConstraint(
                fields=['iniciater','accepter'],name='unique_connection_request'
                )]

    def __str__(self):
        return self.status
