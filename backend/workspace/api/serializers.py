from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from workspace import models
from users.api.serializers import UserSerializer
from django.db.models import Q



UserModel=get_user_model()

class MembershipSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model=models.Membership
        fields=['role','user']
 
class CommentSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=models.Comment
        fields='__all__'
        read_only_fields=['user']


    def validate(self, attrs):
        user=self.context['request'].user
        workspace=attrs['workspace']
        project=attrs['project']
        task=attrs['task']
        if not workspace.membership.filter(user=user).exists():
            raise PermissionDenied('you dont have permission to perform this operation')
        if not project.members.filter(id=user.id).exists():
            raise PermissionDenied('you dont have permission to perform this operation')
        if not task.members.filter(id=user.id).exists():
            raise PermissionDenied('you dont have permission to perform this operation')

        return attrs


class TaskSerializer(serializers.ModelSerializer):
    members=UserSerializer(many=True,read_only=True)
    comment_task=CommentSerializer(many=True,read_only=True)
    class Meta:
        model=models.Task
        fields=['id','title','project','workspace','comment_task','description','members','created_by']
        read_only_fields=['created_by']


    def validate(self, attrs):
        auth_user=self.context['request'].user
        print('auth user',auth_user)
        workspace=attrs['workspace']
        attrs['members'].append(auth_user)
        if not workspace.membership.filter(user=auth_user,role__in=['owner','admin']).exists():
            print( workspace.membership.filter(role__in=['owner','admin'],user=auth_user))
            print('WORKSPACE:',workspace)
            raise PermissionDenied('you dont have the permissions to perform this operation')
        return attrs



class ProjectSerializer(serializers.ModelSerializer):
    members=UserSerializer(many=True,required=False)
    # task_project=TaskSerializer(many=True,read_only=True)
    project_tasks=serializers.SerializerMethodField()
    admins=serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all(),many=True,required=False,write_only=True)
    project_admins=serializers.SerializerMethodField()
    class Meta:
        model=models.Project
        fields=['id','name','workspace','created_by','admins','project_admins','members','project_tasks','description']
        read_only_fields=['created_by','project_admins']


    def create(self, validated_data):
        if '_existing' in validated_data:
            return validated_data['_existing']
        workspace=validated_data['workspace']
        member=workspace.membership.filter(workspace=workspace,role='owner').first()
        owner=member.user
        project=super().create(validated_data)
        project.admins.add(owner,validated_data['created_by'])
        return project


    def validate(self, attrs):
        current_user=self.context['request'].user
        workspace=attrs['workspace']
        if not workspace.membership.filter(user=current_user,role__in=['owner','admin']).exists():
            raise PermissionDenied('you dont have permission to perform this operation')
        existing=models.Project.objects.filter(workspace=workspace,name=attrs.get('name'),created_by=current_user).first()
        if existing:
            attrs['_existing']=existing
        return attrs

    def get_project_admins(self,obj):
        current_user=self.context['request'].user
        workspace=obj.workspace
        wk_owner=workspace.membership.filter(role='owner').first()
        # if current_user in set(obj.admins.all()):
        if current_user != wk_owner.user:
            not_ex=obj.admins.all()
            print('NOT EXT:',not_ex)
            admins=obj.admins.all().exclude(id=wk_owner.user.id)
            print('EX:',admins)
            return UserSerializer(admins,many=True,context=self.context).data
        owner_admin_list=obj.admins.all()
        return UserSerializer(owner_admin_list,many=True,context=self.context).data
    def get_project_tasks(self,obj):
        current_user=self.context['request'].user
        if obj.task_project.filter(Q(members=current_user) | Q(admins=current_user)).exists():
            return obj.task_project.values('id','title')
        return None

class InviteTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.InviteToken
        fields=['id','token','workspace']

    def create(self, validated_data):
        if '_existing_token' in validated_data:
            return validated_data['_existing_token']
        user=self.context['request'].user
        token=models.InviteToken.objects.create(**validated_data)
        log=models.InviteTokenAuditLog.objects.create(user=user,token=token)
        return token

    def validate(self, attrs):
        user=self.context['request'].user
        log=models.InviteTokenAuditLog.objects.filter(user=user,action='token created').first()
        if log and not log.token.revoked:
            attrs['_existing_token']=log.token
        return attrs

class WorkSpaceSerializer(serializers.ModelSerializer):
    projects=serializers.SerializerMethodField()
    # project_ids=serializers.PrimaryKeyRelatedField(source='projects',many=True,read_only=True)
    class Meta:
        model=models.WorkSpace
        fields=['id','name','description','projects','created_at','updated_at']


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
    def get_projects(self,obj):
        user=self.context['request'].user
        user_project=obj.projects.filter(Q(admins=user)|Q(members=user))
        return [{'id':project.id,'name':project.name} for project in user_project]

   
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
class TokenAuditTrailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.InviteTokenAuditLog
        fields=['id','token','action']


class InviteRequestSerializer(serializers.ModelSerializer):
    pending_user=UserSerializer(read_only=True)
    class Meta:
        model=models.InviteRequest
        fields='__all__'


    def update(self, instance, validated_data):
        if validated_data.get('status') == 'accept':
            project=getattr(self.instance,'project')
            project.members.add(instance.pending_user)
            wk_memb=models.Membership.objects.create(workspace=project.workspace,user=instance.pending_user,role='member')
            instance.status=validated_data.get('status')
            project.save()
            instance.save()
        return instance


