from rest_framework.exceptions import ValidationError
import secrets
import re
from django.core.mail import send_mail
from datetime import date,datetime,timedelta
import workspace
from workspace.models import Project,InviteToken,Invite
# from django.core.cache import cache
from workspace.api.serializers import InviteTokenSerializer,InviteSerializer,TokenAuditTrailSerializer
import logging
from urllib.parse import urlencode
from django.core.mail import EmailMultiAlternatives
from workspace.models import Membership,InviteToken
from django.db import transaction



logger=logging.getLogger(__name__)




class InviteService:
    @staticmethod
    def send_invite(project,email,user,request):
        workspace=getattr(project,'workspace')
        #remeber to add time expiry to it
        if not email:
            raise ValidationError('emai cannot be None')
        pattern=r'^[a-zA-Z0-9%_.-]+@[a-zA-Z0-9%-._]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern,email):
            raise ValidationError('invalid email')
        sender_name=f'{user.first_name} {user.last_name}'
        workspace_name=getattr(workspace,'name')
        invite_token=secrets.token_urlsafe(32)

        serializer=InviteSerializer(
                data={
                    'token':invite_token,
                    'email':email,
                    'project':project.id
                    },
                context={
                    'request':request
                    }
                )
        serializer.is_valid(raise_exception=True)
        invite=serializer.save()
        id=getattr(invite,'id')
        data=serializer.data
        query_params={
                'token':invite_token,'invite':id
                }
        link="https://localhost:5173/accept-invite/?"+urlencode(query_params)

        subject=f'{sender_name} has invited you to join {workspace_name}'

        text_content=f"""Accept the invitation using the link below to access the workspace and collaborate with the team: 



        {link}
        """,

        html_content=f"""
        <html>
        <body>

        <p>{sender_name} has invited you to join {workspace_name}</p>
        
        <p>Accept the invitation using the link below to access the workspace and collaborate with the team: </p>

        <p>
            <a href="{link}">accepts Invitation</a>
        </p>

        </body>
        </html>

        """
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email='@noreply.com',
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")

        email.send()
        return link

    @staticmethod
    def accept_invite(invite,user,token,request):
        project=invite.project
        if user in set(project.members.all()):
            raise ValidationError('invalid request')
        logger.info(f"model token:{invite.token.token}")
        logger.info(f"incoming token:{token}")
        if not invite.token.token == token:
            raise ValidationError('invalid operation')

        with transaction.atomic():
            invite.status=(
                    'Accepted'
                    if request.data.get('status') == 'accept'
                    else 'Declined'
                    )
            invite.save(update_fields=['status'])
            if invite.status == 'Accepted':
                workspace=invite.project.workspace
                manager=getattr(Membership,'objects')
                member,_=manager.get_or_create(
                        workspace=workspace,
                        user=user,
                        defaults={'role':'member'}
                        )
                project.members.add(member)
            invite.token.no_used=1
            invite.token.save()
            audit=TokenAuditTrailSerializer(data={'action':'token used','token':invite.token.id,'user':user},context={'request':request})
            audit.is_valid(raise_exception=True)
            audit.save(user=user)
            # return {'status':'thanks for accepting to join the workspace,our admins will get your request approved immediately'}

