from django.db import models
from workspace.models import WorkSpace
from django.contrib.auth import get_user_model
# Create your models here.


User=get_user_model()
class Plan(models.Model):
    name=models.CharField(max_length=100)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    currency=models.CharField(max_length=100,default='NGN')
    intervals=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)
    features=models.JSONField(default=dict)
    members_limit=models.IntegerField(null=True,blank=True)
    stripe_price_id=models.CharField(max_length=100)
    stripe_product_id=models.CharField(max_length=100)
    description=models.CharField(max_length=500)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='plan'

    def __str__(self):
        return self.name

# class Price(model.Model):
#     period=models.CharField(max_length=100,default='month')
#     currency=models.CharField(max_length=100,default='NGN')
#     amount=models.DecimalField(max_digits=10,decimal_places=2)
#     strip_price_id=models.CharField(max_length=100)
#     plan=models.ForeignKey(Plan,related_name='plan_price',on_delete=models.CASCADE)

class Subscription(models.Model):
    workspace=models.ForeignKey(WorkSpace,related_name='subscription',on_delete=models.CASCADE)
    plan=models.ForeignKey(Plan,related_name='subscripiton_plan',on_delete=models.CASCADE)
    stripe_subscription_id=models.CharField(max_length=200)
    subcription_item_id=models.CharField(null=True,blank=True)
    status=models.CharField(choices=[('active','Active'),('past_due','Past_Due'),('canceled','Canceled'),('past_due','Past_due')],default='active')
    current_period_start=models.DateTimeField()
    current_period_end=models.DateTimeField()
