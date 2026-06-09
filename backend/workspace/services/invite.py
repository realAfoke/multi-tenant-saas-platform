# from rest_framework.exceptions import ValidationError
# import secrets
# import re
# from django.core.mail import send_mail
# from datetime import date,datetime,timedelta
# from workspace.models import Project, WorkSpace,InviteToken,InviteRequest
# from django.core.cache import cache
# from workspace.api.serializers import InviteTokenSerializer,InviteRequestSerializer,TokenAuditTrailSerializer
#
#
# def send_invite(request):
#     email=request.data.get('email')
#     project=request.data.get('project')
#     if project is None:
#         raise ValidationError('invalid request')
#     print('PROJECT:',Project)
#     print('MODULE:',Project.__module__)
#     print('ATTR:',hasattr(Project,'DoesNotExist'))
#
#     try:
#         project=Project.objects.get(id=project)
#         workspace=getattr(project,'work_space')
#     except Project.DoesNotExist:
#         raise ValidationError('invalid request')
#     #remeber to add time expiry to it
#     if not email:
#         raise ValidationError('emai cannot be None')
#     pattern=r'^[a-zA-Z0-9%_.-]+@[a-zA-Z0-9%-._]+\.[a-zA-Z]{2,}$'
#     if not re.match(pattern,email):
#         raise ValidationError('invalid email')
#     sender_name=f'{request.user.first_name} {request.user.last_name}'
#     work_space_name=getattr(workspace,'name')
#     invite_token=secrets.token_urlsafe(32)
#
#     serializer=InviteTokenSerializer(data={'token':invite_token,'work_space':workspace.id},context={'request':request})
#     serializer.is_valid(raise_exception=True)
#     serializer.save()
#     invite_token=serializer.data.get('token')
#     link=f'https://localhost:8000/workspace/api/invite/{invite_token}/{project.id}/'
#
#     send_mail(f'{sender_name} has invited you to join {work_space_name}', f'Accept the invitation using the link below to access the workspace and collaborate with the team \n {link}','@noreply.com',[f'{email}'])
#     return link
#
# def accept_invite(request,*args,**kwargs):
#     user=request.user
#     token=kwargs.get('token')
#     prj_id=kwargs.get('pk')
#
#     try:
#         project=Project.objects.get(id=prj_id)
#     except Project.DoesNotExist:
#         raise ValidationError('invalid request')
#
#     if user in set(project.members.all()):
#         raise ValidationError('invalid request')
#     db_token=InviteToken.objects.filter(token=token).first()
#     print('DB_TOKEN:',db_token)
#     if not db_token or getattr(db_token,'revoked',False):
#         raise ValidationError('invalid operation')
#     serializer=InviteRequestSerializer(data={'project':project.id,'pending_user':user.id,'workspace':project.work_space.id})
#     serializer.is_valid(raise_exception=True)
#     serializer.save(pending_user=user)
#     print('USER ID:',user.id)
#     audit=TokenAuditTrailSerializer(data={'action':'token used','token':db_token.id})
#     audit.is_valid(raise_exception=True)
#     audit.save(user=user)
#     return 'thanks for accepting to join the workspace,our admins will get your request approved immediately'
#
#
#
#         # if not project.work_space.filter(members=user):
#     #     project.work_space.members.add(user)
#     #     project.work_sapce.save()
#     #
#     # project.members.add(user)
#     # project.save()
#
