from django.core.mail.backends.base import BaseEmailBackend
import os
from email.mime.base import MIMEBase
import base64
import resend
from resend.exceptions import ResendError




class ResendEmailBackend(BaseEmailBackend):
    def __init__(self, fail_silently=..., *, alias=None, _ignore_unknown_kwargs=None, **kwargs):
        super().__init__(fail_silently=fail_silently)
        self.api_key=os.getenv('RESEND_API_KEY')


    def _encode_attachment(self,attachment):
        if isinstance(attachment,MIMEBase):
            filename=attachment.get_filename() or "attachment"
            content=attachment.get_payload(decode=True)

            if content is None:
                raise ValueError(
                        "Unable to read MIME attachment content"
                        )
        else:
            filename,content,*metadata=attachment

            if isinstance(content,str):
                content=content.encode("utf-8")

            if not isinstance(content,bytes):
                raise TypeError(
                        "Attachment content must be str or bytes"
                        )

        return {
                "filename":filename,
                "content":base64.b64encode(content).decode("ascii"),
                }

    def _build_payload(self,message):
        payload={
                "from":message.from_email,
                "to":message.to,
                "subject":message.subject,
                "text":message.body or ""
                }

        if message.cc:
            payload["cc"]=message.cc

        if message.bcc:
            payload["bcc"]=message.bcc

        if message.reply_to:
            payload["reply_to"]=message.reply_to


        html_body=None
        
        for content,mimetype in getattr(message,"alternatives",[]):
            if mimetype == 'text/html':
                html_body=content


        if html_body is None and message.content_subtype == 'html':
            html_body=message.body

        if html_body is not None:
            payload["html"]=html_body

        if message.attachments:
            payload["attachments"]=[
                    self._encode_attachment(item) for item in message.attachments
                    ]

        return payload

    def send_messages(self, email_messages):
        if not email_messages:
            return

        resend.api_key=self.api_key
        sent_count=0
        for message in email_messages:
            if not message.recipients():
                continue

            try:
                payload=self._build_payload(message)
                result=resend.Email.send(payload)
                if not result or not result.get("id"):
                    raise RuntimeError(
                            "Resend returned no email ID"
                            )
                sent_count+=1

            except ResendError as exc:
                if not self._fail_silently:
                    raise
            except Exception as exc:
                if not self._fail_silently:
                    raise
        return sent_count
