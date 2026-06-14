from dotenv import load_dotenv
from . base import *


load_dotenv()


CORS_ALLOWED_HOST=['127.0.0.1','localhost']
CORS_ALLOW_CREDENTIALS=True


EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'

# EMAIL_FILE_PATH=BASE_DIR / 'sent_emails'

