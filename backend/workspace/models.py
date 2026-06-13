from django.db import models
from django.contrib.auth import get_user_model
from django.utils import choices

# from django.utils.text import slugify



# Create your models here.

UserModel=get_user_model()


class Choices(models.TextChoices):
    IN_PROGRESS='in_progress' 'in progress'
    DONE='done'
    CANCELLED='cancelled'



class WorkSpace(models.Model):
    name=models.CharField(max_length=150)
    description=models.TextField()
    slug=models.SlugField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='workspace'

    def __str__(self):
        return str(self.name)



class Membership(models.Model):
    workspace=models.ForeignKey(WorkSpace,related_name='membership',on_delete=models.CASCADE)
    user=models.ForeignKey(UserModel,related_name='user_membership',on_delete=models.CASCADE)
    role=models.CharField(choices=[('owner','Owner'),('admin','Admin'),('member','Member')])

    class Meta:
        db_table='membership'

    def __str__(self):
        return getattr(self.user,'email')


class Project(models.Model):
    name=models.CharField(max_length=100)
    workspace=models.ForeignKey(WorkSpace,related_name='projects',on_delete=models.CASCADE)
    created_by=models.ForeignKey(UserModel,related_name='creator',on_delete=models.CASCADE)
    admins=models.ManyToManyField(UserModel,related_name='project_admins')
    members=models.ManyToManyField(UserModel,related_name='project_members')
    description=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='project'

    def __str__(self):
        return self.name

class Task(models.Model):
    title=models.CharField(max_length=250)
    project=models.ForeignKey(Project,related_name='task_project',on_delete=models.CASCADE)
    workspace=models.ForeignKey(WorkSpace,related_name='task_workspace',on_delete=models.CASCADE)
    description=models.TextField()
    status=models.CharField(max_length=200,choices=Choices.choices,default=Choices.IN_PROGRESS)
    admins=models.ManyToManyField(UserModel,related_name='task_admins')
    created_by=models.ForeignKey(UserModel,related_name='task_creator',on_delete=models.CASCADE)
    members=models.ManyToManyField(UserModel,related_name='task_members')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        db_table='task'

    def __str__(self):
        return self.title

class Comment(models.Model):
    content=models.TextField()
    user=models.ForeignKey(UserModel,related_name='commentor',on_delete=models.CASCADE)
    workspace=models.ForeignKey(WorkSpace,related_name='comment_workspace',on_delete=models.CASCADE)
    project=models.ForeignKey(Project,related_name='comment_project',on_delete=models.CASCADE)
    task=models.ForeignKey(Task,related_name='comment_task',on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='comment'

    def __str__(self):
        return self.content


class FileAttachment(models.Model):
    file=models.FileField(upload_to='task_attachment/')
    task=models.ForeignKey(Task,related_name='task_attachment',on_delete=models.CASCADE)
    workspace=models.ForeignKey(WorkSpace,related_name='workspace_file',on_delete=models.CASCADE)
    project=models.ForeignKey(Project,related_name='project_file',on_delete=models.CASCADE)
    uploader=models.ForeignKey(UserModel,related_name='file_uploader',on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='file_attachment'

    def __str__(self):
        return self.file


class InviteToken(models.Model):
    token=models.CharField(max_length=200,null=True,blank=True)
    workspace=models.ForeignKey(WorkSpace,related_name='invite_token',on_delete=models.CASCADE)
    revoked=models.BooleanField(default=False)
    no_used=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='invite_token'

    def __str__(self):
        return str(self.token) 

class InviteTokenActions(models.TextChoices):
    TOKEN_CREATED='token created'
    TOKEN_USED='token used'
    TOKEN_REVOKED='token revoked'

class InviteTokenAuditLog(models.Model):
    user=models.ForeignKey(UserModel,related_name='invite_token_user',on_delete=models.CASCADE)
    action=models.CharField(max_length=200,choices=InviteTokenActions.choices,default=InviteTokenActions.TOKEN_CREATED)
    token=models.ForeignKey(InviteToken,related_name='token_log',on_delete=models.CASCADE)
    time=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='audit_log'

    def __str__(self):
        return str(self.action)

class InviteRequest(models.Model):
    pending_user=models.ForeignKey(UserModel,related_name='pending_user',on_delete=models.CASCADE)
    status=models.CharField(max_length=200,default='pending',)
    project=models.ForeignKey(Project,related_name='request_project',on_delete=models.CASCADE)
    workspace=models.ForeignKey(WorkSpace,related_name='workspace_request',on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='invite_request'
        constraints=[
                models.UniqueConstraint(
                    fields=['pending_user','workspace'],name='unique_workspace_request'
                    )
                ]

    def __str__(self):
        return str(self.pending_user)

