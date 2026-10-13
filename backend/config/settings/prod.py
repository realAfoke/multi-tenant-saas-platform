from .base import *
import os
import dj_database_url




db_url=os.getenv('DATABASE_URL')
assert db_url, 'DATABASE URL IS MISSING'
DATABASES={
        'default':dj_database_url.parse(db_url)
        }


EMAIL_BACKEND ='django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST=os.getenv("EMAIL_HOST","smtp.gmail.com")
EMAIL_PORT=int(os.getenv("EMAIL_PORT","587"))
EMAIL_USE_TLS=os.getenv("EMAIL_USE_TLS","True").lower() == "true"

EMAIL_USE_SSL=False
EMAIL_HOST_USER=os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD=os.getenv("EMAIL_HOST_PASSWORD")

EMAIL_TIMEOUT=15
