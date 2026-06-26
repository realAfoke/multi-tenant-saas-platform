from dotenv import load_dotenv
from . base import *


load_dotenv()


# ALLOWED_HOST=['127.0.0.1','localhost']
# CORS_ALLOW_HOST=[]
CORS_ALLOW_CREDENTIALS=True


EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend'

# EMAIL_FILE_PATH=BASE_DIR / 'sent_emails'

