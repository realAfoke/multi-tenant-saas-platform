from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError

# Create your models here.


class UserManager(BaseUserManager):
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
        return self.create_user(email,password,phone,**extra_fields)



class CustomUser(AbstractUser):
    phone=models.CharField(max_length=17,null=True,blank=True)
    email=models.EmailField(_('email address'),unique=True,help_text=_('Required: valid email domain are allowed'),error_messages={'unique':'A user with that username already exist'})
    username=models.CharField(max_length=200,unique=False,blank=True,null=True)

    objects=UserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    class Meta:
        db_table='usermodel'

    def __str__(self):
        # return str(self.email)
        return self.email







