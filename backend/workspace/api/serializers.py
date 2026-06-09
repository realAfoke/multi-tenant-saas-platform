from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from workspace import models
from users.api.serializers import UserSerializer
import workspace


UserModel=get_user_model()
#
# class BaseProject(serializers.ModelSerializer):
#     class Meta:
#         model=models.Project
#         fields=['id','name','work_space','description']
#
# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.Comment
#         fields='__all__'
#         read_only_fields=['user']
#
#
#     def validate(self, attrs):
#         user=self.context['request'].user
#         workspace=attrs['work_space']
#         project=attrs['project']
#         task=attrs['task']
#         if not workspace.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not project.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not task.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         return attrs
#
#
# class TaskSerializer(serializers.ModelSerializer):
#     members=serializers.PrimaryKeyRelatedField(many=True,queryset=UserModel.objects.all())
#     comment_task=CommentSerializer(many=True,read_only=True)
#     class Meta:
#         model=models.Task
#         fields=['id','title','project','work_space','comment_task','description','members','created_by']
#         read_only_fields=['created_by']
#
#
#     def validate(self, attrs):
#         auth_user=self.context['request'].user
#         workspace=attrs['work_space']
#         attrs['members'].append(auth_user)
#         if auth_user != workspace.super_admin and workspace.admins != auth_user:
#             raise PermissionDenied('you dont have the permissions to perform this operation')
#         return attrs
#
#
#
# class ProjectSerializer(serializers.ModelSerializer):
#     members=serializers.PrimaryKeyRelatedField(many=True,queryset=UserModel.objects.all())
#     task_project=TaskSerializer(many=True,read_only=True)
#     class Meta:
#         model=models.Project
#         fields=['id','name','work_space','members','task_project','description']
#
#
#     def validate(self, attrs):
#         current_user=self.context['request'].user
#         workspace=attrs['work_space']
#         if current_user != workspace.super_admin and not workspace.admins.filter(id=current_user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         return attrs
#
#
# class InviteTokenSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.InviteToken
#         fields=['id','token','work_space']
#
#     def create(self, validated_data):
#         if '_existing_token' in validated_data:
#             return validated_data['_existing_token']
#         user=self.context['request'].user
#         token=models.InviteToken.objects.create(**validated_data)
#         log=models.InviteTokenAuditLog.objects.create(user=user,token=token)
#         return token
#
#     def validate(self, attrs):
#         user=self.context['request'].user
#         log=models.InviteTokenAuditLog.objects.filter(user=user,action='token created').first()
#         if log and not log.token.revoked:
#             attrs['_existing_token']=log.token
#         return attrs
#
class WorkSpaceSerializer(serializers.ModelSerializer):
    # projects=serializers.SerializerMethodField()
    project_ids=serializers.PrimaryKeyRelatedField(source='projects',many=True,read_only=True)
    class Meta:
        model=models.WorkSpace
        fields=['id','name','description','project_ids','created_at','updated_at']


    def create(self, validated_data):
        owner=self.context['request'].user
        if '_existing' in validated_data:
            return validated_data['_existing']
        workspace=models.WorkSpace.objects.create(**validated_data)
        models.Membership.objects.create(workspace=workspace,user=owner,role='owner')
        return workspace

    def validate(self, attrs):
        current_user=self.context['request'].user
        if not self.instance:
            if attrs.get('name') is None:
                raise ValidationError('workspace cannot be null, please specify a workspace name')
            existing=models.WorkSpace.objects.filter(name=attrs.get('name'),membership__role__in=['owner']).first()
            if existing:
                attrs['_existing']=existing
            return attrs
        else:
            memb=self.instance.membership.filter(user=current_user,workspace=self.instance).first()
            if memb.role not in ('owner','admin'):
                print('MEMB:',memb.role)
                raise PermissionDenied('you dont have permission to perform this operation')
            if len(self.instance.membership.all()) > 500:
                raise ValidationError('workspace membership limmit reached')
            return attrs

class MembershipSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model=models.Membership
        fields=['role','user']

    
# class UserWorkSpacesSerializer(serializers.Serializer):
#     user=serializers.SerializerMethodField()
#     work_spaces=serializers.SerializerMethodField() 
#
#     def get_user(self,obj):
#         return UserSerializer(obj).data
#     def get_work_spaces(self,obj):
#         workspaces=models.WorkSpace.objects.filter(members=obj.id).order_by('-updated_at')
#         return BaseWorkSpace(workspaces,many=True,context=self.context).data
#
       
# class FileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.FileAttachment
#         fields='__all__'
#
#
#     def validate(self, attrs):
#         user=self.context['request'].user
#         workspace=attrs['work_space']
#         project=attrs['project']
#         task=attrs['task']
#         if not workspace.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not project.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not task.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#
#
# class TokenAuditTrailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.InviteTokenAuditLog
#         fields=['id','token','action']
#
#
# class InviteRequestSerializer(serializers.ModelSerializer):
#     pending_user=UserSerializer(read_only=True)
#     class Meta:
#         model=models.InviteRequest
#         fields='__all__'
#
#
#     def update(self, instance, validated_data):
#         if validated_data.get('status') == 'accept':
#             project=getattr(self.instance,'project')
#             project.members.add(instance.pending_user)
#             project.work_space.members.add(instance.pending_user)
#             project.work_space.save()
#             instance.status=validated_data.get('status')
#             project.save()
#             instance.save()
#         return instance
#

