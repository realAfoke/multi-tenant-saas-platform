from django.core.cache import cache
from users.api.serializers import UserSerializer
from rest_framework.exceptions import ValidationError



def create_user(request):
    if 'email' not in request.data and 'phone' not in request.data:
        raise ValidationError('credentials not provided')
    user_detail=request.data.get('email') or request.data.get('phone')
    if not cache.get(f'confirm:{user_detail}'): 
        raise ValidationError(f'{user_detail} is not verified')
    registration_data={'email':request.data.get('email',''),'password':request.data.get('password'),'phone':request.data.get('phone',None)}
    serialier=UserSerializer(data=request.data,context={'request':request})
    serialier.is_valid(raise_exception=True)
    user=serialier.save(**registration_data)
    return {'user':user,'data':serialier.data}

