from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.


class UserManger(BaseUserManager):
    use_in_migrations=True

    def create_user(self,email,password,phone=None,**extra_fields):
        if email is None and phone is None:
            raise ValueError('Email Or Phone must be provided')
        if email:
            email=self.normalize_email(email)
            user=self.model(email=email,**extra_fields)
        else:
            user=self.model(phone=phone,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,password,phone=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('super user must have is_staff set=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('superuser must have is_supersuer set=True')
        return self.create_user(email,phone,password,**extra_fields)



class CustomUser(AbstractUser):
    phone=models.CharField(max_length=17,null=True,blank=True)
    email=models.EmailField(_('email address'),unique=True,help_text=_('Required.valid email domain are allowed'),error_messages={'unique':'A user with that username already exist'})
    username=models.CharField(max_length=200,unique=False,blank=True,null=True)


    objects=UserManger()


    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]



class Choices(models.TextChoices):
    IN_PROGRESS='in_progress' 'in progress'
    DONE='done'
    CANCELLED='cancelled'


class WorkSpace(models.Model):
    name=models.CharField(max_length=150)
    super_admin=models.ForeignKey(CustomUser,related_name='workspace_super_admin',on_delete=models.CASCADE)
    admins=models.ManyToManyField(CustomUser,related_name='workspace_admins')
    member=models.ManyToManyField(CustomUser,related_name='workspace_member')
    description=models.TextField()
    slug=models.SlugField(null=True,blank=True)
    projects=models.ManyToManyField('Project',related_name='workspace_project')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


class Project(models.Model):
    name=models.CharField(max_length=100)
    work_space=models.ForeignKey(WorkSpace,related_name='project_workspace',on_delete=models.CASCADE)
    created_by=models.ForeignKey(CustomUser,related_name='project_creator',on_delete=models.CASCADE)
    description=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

class Task(models.Model):
    title=models.CharField(max_length=250)
    project=models.ForeignKey(Project,related_name='task_project',on_delete=models.CASCADE)
    work_space=models.ForeignKey(WorkSpace,related_name='task_workspace',on_delete=models.CASCADE)
    description=models.TextField()
    status=models.CharField(max_length=200,choices=Choices.choices,default=Choices.IN_PROGRESS)
    created_by=models.ForeignKey(CustomUser,related_name='task_creator',on_delete=models.CASCADE)
    members=models.ManyToManyField(CustomUser,related_name='task_members')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


class Comment(models.Model):
    content=models.TextField()
    user=models.ForeignKey(CustomUser,related_name='commentor',on_delete=models.CASCADE)
    work_space=models.ForeignKey(WorkSpace,related_name='comment_workspace',on_delete=models.CASCADE)
    project=models.ForeignKey(Project,related_name='comment_project',on_delete=models.CASCADE)
    Task=models.ForeignKey(Task,related_name='comment_task',on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

class FileAttachment(models.Model):
    file=models.FileField(upload_to='task_attachment/')
    task=models.ForeignKey(Task,related_name='task_attachment',on_delete=models.CASCADE)
    uploader=models.ForeignKey(CustomUser,related_name='file_uploader',on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)






