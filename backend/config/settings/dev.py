from dotenv import load_dotenv
from . base import *
import os


load_dotenv()




EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'
# EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'

EMAIL_FILE_PATH=BASE_DIR / 'sent_emails'



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':os.getenv('DB_NAME') ,
        'USER':os.getenv('DB_USER'),
        'HOST':os.getenv('DB_HOST'),
        'PASSWORD':os.getenv('DB_PASSWORD')
    }
}


