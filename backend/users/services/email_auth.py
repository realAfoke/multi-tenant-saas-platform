import random
import re
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.exceptions import ValidationError

def verify_email(model,request):
    query={}
    if 'phone' in request.data and len(request.data['phone']) == 15:
        query['phone']=request.data.get('phone')
    if 'email' in request.data:
        pattern=r'^[a-zA-Z0-9.%_+-]+@[a-zA-Z0-9.%+_-]+\.[a-zA-Z]{2,}$'
        match =re.match(pattern,request.data.get('email'))
        if not match:
            raise ValidationError('invalid crendentials') 
        query['email']=request.data.get('email')
    is_used=model.objects.filter(**query).exists()
    if is_used:
        raise ValidationError('Invalid credentials')
    otp=random.randint(100000,999999)
    otp_key= 'email' if 'email' in query else 'phone'
    key=f'otp:{query[otp_key]}'
    cache.set(key,otp,timeout=300)
    send_mail('EMAIL VERIFICATION CODE',f'Your Email verification is {otp}','noreply@example.com',[f'{query[otp_key]}'])
    return {"status":"otp sent to provided email"}

def verify_otp(key,value):
    otp_key=f'otp:{key}'
    otp=cache.get(otp_key)
    if otp != value:
        raise ValidationError('otp is invalid')
    cache.set(f'confirm:{key}',True,timeout=300)
    return {'status':'otp is confirmed'}

