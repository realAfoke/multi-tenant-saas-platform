from rest_framework.exceptions import ValidationError
import secrets
import re
from django.core.mail import send_mail
from datetime import date,datetime,timedelta
from workspace.models import Project,InviteToken
# from django.core.cache import cache
from workspace.api.serializers import InviteTokenSerializer,InviteRequestSerializer,TokenAuditTrailSerializer
#
#
def send_invite(request):
    email=request.data.get('email')
    project=request.data.get('project')
    if project is None:
        raise ValidationError('invalid request')
    try:
        project=Project.objects.get(id=project)
        workspace=getattr(project,'workspace')
    except Project.DoesNotExist:
        raise ValidationError('invalid request no project found')
    #remeber to add time expiry to it
    if not email:
        raise ValidationError('emai cannot be None')
    pattern=r'^[a-zA-Z0-9%_.-]+@[a-zA-Z0-9%-._]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern,email):
        raise ValidationError('invalid email')
    sender_name=f'{request.user.first_name} {request.user.last_name}'
    workspace_name=getattr(workspace,'name')
    invite_token=secrets.token_urlsafe(32)

    serializer=InviteTokenSerializer(data={'token':invite_token,'workspace':workspace.id},context={'request':request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    invite_token=serializer.data.get('token')
    link=f'https://localhost:8000/workspace/api/invite/{invite_token}/{project.id}/'

    send_mail(f'{sender_name} has invited you to join {workspace_name}', f'Accept the invitation using the link below to access the workspace and collaborate with the team \n {link}','@noreply.com',[f'{email}'])
    return link

def accept_invite(request,token,pk):
    user=request.user
    # token=kwargs.get('token')
    # prj_id=kwargs.get('pk')

    try:
        project=Project.objects.get(id=pk)
    except Project.DoesNotExist:
        raise ValidationError('invalid request')

    if user in set(project.members.all()):
        raise ValidationError('invalid request')
    db_token=InviteToken.objects.filter(token=token).first()
    if not db_token or getattr(db_token,'revoked',False):
        raise ValidationError('invalid operation')
    serializer=InviteRequestSerializer(data={'project':project.id,'pending_user':user.id,'workspace':project.workspace.id})
    serializer.is_valid(raise_exception=True)
    serializer.save(pending_user=user)
    audit=TokenAuditTrailSerializer(data={'action':'token used','token':db_token.id})
    audit.is_valid(raise_exception=True)
    audit.save(user=user)
    return {'status':'thanks for accepting to join the workspace,our admins will get your request approved immediately'}

