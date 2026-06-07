from django.db import models
from django.contrib.auth import get_user_model
# from django.utils.text import slugify



# Create your models here.

UserModel=get_user_model()


class Choices(models.TextChoices):
    IN_PROGRESS='in_progress' 'in progress'
    DONE='done'
    CANCELLED='cancelled'



class WorkSpace(models.Model):
    name=models.CharField(max_length=150)
    super_admin=models.ForeignKey(UserModel,related_name='workspace_super_admin',on_delete=models.CASCADE)
    admins=models.ForeignKey(UserModel,related_name='workspace_admins',on_delete=models.SET_NULL,null=True,blank=True)
    members=models.ManyToManyField(UserModel,related_name='workspace_member')
    description=models.TextField()
    slug=models.SlugField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='workspace'

    def __str__(self):
        return str(self.name)

    # def save(self, *, force_insert=False, force_update=False, using=None, update_fields=None):
    #     if not self.slug:
    #         new_slug=slugify(self.name)
    #         base=new_slug
    #         counter=1
    #         while self.__class__.filter(slug=base).exists():
    #             base=f'{base}--{counter}'
    #             new_slug=base
    #             counter+=1
    #         self.slug=new_slug
    #     return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)

class Project(models.Model):
    name=models.CharField(max_length=100)
    work_space=models.ForeignKey(WorkSpace,related_name='workspace_project',on_delete=models.CASCADE)
    created_by=models.ForeignKey(UserModel,related_name='project_creator',on_delete=models.CASCADE)
    admins=models.ForeignKey(UserModel,related_name='project_admin',on_delete=models.CASCADE,null=True,blank=True)
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
    work_space=models.ForeignKey(WorkSpace,related_name='task_workspace',on_delete=models.CASCADE)
    description=models.TextField()
    status=models.CharField(max_length=200,choices=Choices.choices,default=Choices.IN_PROGRESS)
    admins=models.ForeignKey(UserModel,related_name='task_admin',on_delete=models.CASCADE,null=True,blank=True)
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
    work_space=models.ForeignKey(WorkSpace,related_name='comment_workspace',on_delete=models.CASCADE)
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
    work_space=models.ForeignKey(WorkSpace,related_name='workspace_file',on_delete=models.CASCADE)
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
    work_space=models.ForeignKey(WorkSpace,related_name='invite_token',on_delete=models.CASCADE)
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
    work_space=models.ForeignKey(WorkSpace,related_name='workspace_request',on_delete=models.CASCADE)
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

