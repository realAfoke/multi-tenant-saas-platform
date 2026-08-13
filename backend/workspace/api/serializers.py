from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView
from workspace import models
from users.api.serializers import UserSerializer
from django.db.models import Q, QuerySet
import logging

import workspace




logger=logging.getLogger(__name__)
UserModel=get_user_model()

class MembershipSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model=models.Membership
        fields=['id','role','user']
 
class CommentSerializer(serializers.ModelSerializer):
    # user=UserSerializer()
    user=serializers.SerializerMethodField()
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
        if not (project.members.filter(id=user.id).exists() or project.admins.filter(id=user.id).exists()):
            raise PermissionDenied('you dont have permission to perform this operation')
        if not task.members.filter(id=user.id).exists():
            raise PermissionDenied('you dont have permission to perform this operation')

        return attrs
    def get_user(self,obj):
        return {'id':obj.user.id,'email':obj.user.email,'first_name':obj.user.first_name,'last_name':obj.user.last_name}


class TaskSerializer(serializers.ModelSerializer):
    # members=UserSerializer(many=True,read_only=True)
    created_by=MembershipSerializer(read_only=True)
    comments=serializers.SerializerMethodField()
    # comment_task=CommentSerializer(many=True,read_only=True)
    class Meta:
        model=models.Task
        fields=[
                'id',
                'title',
                'project',
                'workspace',
                'description',
                'created_by',
                'comments'
                ]
        read_only_fields=[
                'created_by',
                'comments'
                ]
        # fields="__all__"
    # def create(self, validated_data):
    #     logger.info('validated_data:',validated_data)
    #     return super().create(validated_data)


    def validate(self, attrs):
        auth_user=self.context['request'].user
        workspace=attrs['workspace']
        attrs['members']=[]
        attrs['members'].append(auth_user)
        # logger.info('attrs:',attrs)
        if not workspace.membership.filter(user=auth_user,role__in=['owner','admin']).exists():
            raise PermissionDenied('you dont have the permissions to perform this operation')
        return attrs

    def get_comments(self,obj):
        comments_count=obj.comment_task.count()
        return comments_count



class ProjectSerializer(serializers.ModelSerializer):
    members=MembershipSerializer(many=True,required=False)
    tasks=serializers.SerializerMethodField()
    # project_tasks=serializers.SerializerMethodField()
    project_members=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,write_only=True,required=False)
    admins=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,required=False,write_only=True)
    project_admins=serializers.SerializerMethodField()
    workspace_name=serializers.SerializerMethodField()
    class Meta:
        model=models.Project
        fields=[
                'id',
                'name',
                'status',
                'workspace',
                'workspace_name',
                'created_by',
                'admins',
                'project_admins',
                'project_members',
                'members',
                'description',
                'tasks',
                'updated_at'
                ]
        read_only_fields=['created_by','project_admins','updated_at','workspace_name','tasks']


    def create(self, validated_data):
        if '_existing' in validated_data:
            return validated_data['_existing']
        workspace=validated_data['workspace']
        members=validated_data.pop('project_members',[])
        owner=workspace.membership.filter(workspace=workspace,role='owner').first()
        project=super().create(validated_data)
        if owner == project.created_by:
            project.admins.add(owner)
            project.members.add(owner,*members)
        else:
            project.admins.add(owner,validated_data.get('created_by'))
            project.members.add(owner,validated_data.get('created_by'),*members)
        return project


    def validate(self, attrs):
        # if self.instance:
        #     # remember to write real update validation later
        #     logger.info(f'attrs:{attrs}')
        #     return attrs
        current_user=self.context['request'].user
        workspace=attrs.get('workspace')
        membership=current_user.user_membership.filter(workspace=workspace).first()
        if membership.role not in {'admin','owner'}:
            raise PermissionDenied('you dont have permission to perform this operation')
        manager=getattr(models.Project,'objects')
        existing=manager.filter(workspace=workspace,name=attrs.get('name'),created_by=membership).first()
        if existing:
            attrs['_existing']=existing
        attrs['created_by']=membership
        return attrs

    def get_project_admins(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()

        admins=obj.admins.all()
        if membership and membership.role != 'owner':
            admins=obj.admins.exclude(user=current_user)
        return MembershipSerializer(admins,many=True,context=self.context).data
    

    def get_workspace_name(self,obj):
        return obj.workspace.name
    def get_tasks(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()
        tasks=membership.task_members.all()
        logger.info(f'task:{tasks}')
        return TaskSerializer(tasks,many=True,context=self.context).data
        # return obj.task_project.values('id','created_by','title','description','comments','updated_at') if task else None

class InviteTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.InviteToken
        fields=['id','token','workspace']

    ###might come back to this late i moved token and  token audit to invite serialiser i believe it's more compact there

    # def create(self, validated_data):
    #     if '_existing_token' in validated_data:
    #         return validated_data['_existing_token']
    #     token=models.InviteToken.objects.create(**validated_data)
    #     log=models.InviteTokenAuditLog.objects.create(user=user,token=token)
    #     return token
    #
    # def validate(self, attrs):
    #     user=self.context['request'].user
    #     log=models.InviteTokenAuditLog.objects.filter(user=user,action='token created').first()
    #     if log and not log.token.revoked:
    #         attrs['_existing_token']=log.token
    #     attrs['user']=user
    #     return attrs

class WorkSpaceSerializer(serializers.ModelSerializer):
    projects=serializers.SerializerMethodField()
    # project_ids=serializers.PrimaryKeyRelatedField(source='projects',many=True,read_only=True)
    class Meta:
        model=models.WorkSpace
        # fields=['id','name','description','projects','created_at','updated_at']
        fields='__all__'
        read_only_fields=['projects']


    def create(self, validated_data):
        owner=self.context['request'].user
        if '_existing' in validated_data:
            return validated_data['_existing']
        
        manger=getattr(models.WorkSpace,'objects')
        workspace=manger.create(**validated_data)
        member=models.Membership(workspace=workspace,user=owner,role='owner')
        member.save()
        return workspace

    def validate(self, attrs):
        current_user=self.context['request'].user
        if not self.instance:
            if attrs.get('name') is None:
                raise ValidationError('workspace cannot be null, please specify a workspace name')
            manger=getattr(models.WorkSpace,'objects')
            existing=manger.filter(name=attrs.get('name'),membership__role__in=['owner']).first()
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
        workspace_membership=user.user_membership.filter(workspace=obj).first()
        projects=obj.projects.filter(Q(admins=workspace_membership)|Q(members=workspace_membership)).order_by('-updated_at')

        return [{'id':project.id,'name':project.name,'status':project.status,'description':project.description,'updated_at':project.updated_at} for project in projects]

   
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




class TokenAuditTrailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.InviteTokenAuditLog
        fields=['id','token','action']


class InviteSerializer(serializers.ModelSerializer):
    workspace=serializers.CharField(source='project.workspace.name',read_only=True)
    project_name=serializers.CharField(source='project.name',read_only=True)
    invited_by=UserSerializer(read_only=True)
    token=serializers.CharField(write_only=True)
    is_valid=serializers.SerializerMethodField()
    class Meta:
        model=models.Invite
        fields='__all__'

    def create(self, validated_data):
        project=validated_data.pop('project',None)
        email=validated_data.pop('email',None)
        workspace=getattr(project,'workspace')
        token,_=models.InviteToken.objects.get_or_create(token=validated_data.pop('token'),defaults={'workspace':workspace,**validated_data})
        validated_data['token']=token
        invited_by=self.context['request'].user
        invite=models.Invite(invited_by=invited_by,project=project,email=email,**validated_data)
        invite.save()
        models.InviteTokenAuditLog.objects.create(user=invited_by,token=token)
        return invite

    def get_is_valid(self,obj):
        token=obj.token
        return token.no_used <= 0 and not token.revoked

    def get_invited_by(self,obj):
        return obj.invitd_by.invite.values('id','first_name','last_name')

    def update(self, instance, validated_data):
        if validated_data.get('status') == 'accept':
            workspace=getattr(self.instance,'workspace')
            wk_members_count=workspace.membershipt.count()
            plan_limit=workspace.subscription.filter(status='active').first().plan.members_limit
            if wk_members_count >= plan_limit:
                raise ValidationError('Members limit exceeded for this plan, upgrade your plan to add/accept more user invite')
            project=getattr(self.instance,'project')
            project.members.add(instance.pending_user)
            # wk_memb=models.Membership.objects.create(workspace=project.workspace,user=instance.pending_user,role='member')
            instance.status=validated_data.get('status')
            project.save()
            instance.save()
        return instance


