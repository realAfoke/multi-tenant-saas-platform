from django.test import client
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from typing import cast
from rest_framework.response import Response
from django.core.cache import cache
from unittest.mock import patch
from django.contrib.auth import get_user_model


User=get_user_model()

# Create your tests here.

class TestEmailVerification(APITestCase):
    def test_invalid_email_format(self):
        client=APIClient()
        response=cast(Response,client.post('/users/verify-details/',{'email':'userexample.com'},format='json'))
        self.assertEqual(response.status_code,400)
        self.assertEqual(response.data[0] if response.data else response,'invalid email')

    def test_signup_with_empty_detail(self):
        client=APIClient()
        response=cast(Response,client.post('/users/create/',{},format='json'))

        self.assertEqual(response.status_code,400)
        self.assertEqual(response.data[0],'credentials not provided')

    def test_signup_with_unverified_user(self):
        client=APIClient()
        email='user@example.com'
        response=cast(Response,client.post('/users/create/',{'email':email},format='json'))

        self.assertEqual(response.status_code,400)
        self.assertEqual(response.data[0],f'{email} is not verified')
    # def test_duplicate_user(self):


    def test_valid_email_format(self):
        client=APIClient()
        response=cast(Response,client.post('/users/verify-details/',{'email':'user@example.com'},format='json'))

        self.assertEqual(response.status_code,200)
        self.assertEqual(response.data,'WRONG EMAIL')

    def test_confirm_otp_endpoint(self):
        client=APIClient()
        verify_emain=cast(Response,client.post('/users/verify-details/',{'email':'user51@example.com'},format='json'))
        self.assertEqual(verify_emain.status_code,200)

        otp=cache.get('otp:user51@example.com')
        confirm_otp=cast(Response,client.post('/users/confirm-otp/',{'key':'user51@example.com','otp':int(otp)}))

        self.assertEqual(confirm_otp.status_code,200)
        self.assertEqual(confirm_otp.data['status'],'otp is confirmed')

    def test_expired_otp(self):
        email='user51@example.com'
        client=APIClient()
        response=cast(Response,client.post('/users/verify-details/',{'email':email},format='json'))

        self.assertEqual(response.status_code,200)
        otp=cache.get('otp:user51@example.com')
        print('OTP:',otp)
        with patch('django.core.cache.cache.get',return_value=None):
            response=cast(Response,client.post('/users/confirm-otp/',{'key':email,'otp':otp},format='json'))
            print('response:',response)
            self.assertEqual(response.status_code,400)
            self.assertEqual(response.data[0],'otp has expired')

class TestLogin(APITestCase):
    def test_login_with_invalid_credentials(self):
        client=APIClient()
        response=cast(Response,client.post('/users/login/',{'email':'user@.com','password':'user'},format='json'))
        print('DATA:',response.data)
        self.assertEqual(response.status_code,401)
        self.assertEqual(response.data['detail'],'Invalid credentials')

    def test_login_with_valid_credentials(self):
        client=APIClient()
        response=cast(Response,client.post('/users/login/',{'email':'saas@example.com','password':'saas'}))

    def test_login_with_invalid_password(self):
        client=APIClient()
        response=cast(Respons,client.post('/users/login/',{'email':'saas@example.com','password':' '},format='json'))

        self.assertEqual(response.status_code,401)
        # sefl.assertEqual(response.da)
