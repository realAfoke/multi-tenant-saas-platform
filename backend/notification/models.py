from django.db import models
from django.contrib.auth import get_user_model


User=get_user_model()

# Create your models here.

class Notification(models.Model):
    action=models.CharField(max_length=200)
    user=models.ForeignKey(User,related_name='notification',null=True,blank=True,on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)

