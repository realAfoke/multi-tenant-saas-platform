from dotenv import load_dotenv
from . base import *


load_dotenv()


CORS_ALLOW_CREDENTIALS=True


EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'
# EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'

EMAIL_FILE_PATH=BASE_DIR / 'sent_emails'

