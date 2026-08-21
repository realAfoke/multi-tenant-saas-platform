from django.core.validators import validate_image_file_extension
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView
import manage
from workspace import models
from django.db.models import Q, QuerySet
from django.core.mail import send_mail,send_mass_mail
import logging
import workspace
from django.db import transaction


logger=logging.getLogger(__name__)
UserModel=get_user_model()

class MembershipSerializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    class Meta:
        model=models.Membership
        fields=['id','role','user']

    def get_user(self,obj):
        user=obj.user
        return {'id':user.id,'first_name':user.first_name,'last_name':user.last_name,'email':user.email}
 
class CommentSerializer(serializers.ModelSerializer):
    user=MembershipSerializer(read_only=True)
    class Meta:
        model=models.Comment
        fields='__all__'

    @transaction.atomic
    def create(self, validated_data):
        user=self.context['request'].user
        member=user.user_membership.filter(workspace=validated_data.get('workspace')).first()
        validated_data['user']=member
        return super().create(validated_data)

    # def get_user(self,obj):
    #     return {'id':obj.user.id,'email':obj.user.email,'first_name':obj.user.first_name,'last_name':obj.user.last_name}

class TaskMemberSerializer(serializers.ModelSerializer):
    member=MembershipSerializer()
    class Meta:
        model=models.TaskMember
        fields='__all__'



class TaskSerializer(serializers.ModelSerializer):
    created_by=MembershipSerializer(read_only=True)
    comments=serializers.SerializerMethodField()
    check_list=serializers.ListField()
    members=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,write_only=True,required=False)
    # comment_task=CommentSerializer(many=True,read_only=True)
    class Meta:
        model=models.Task
        fields='__all__'

    @transaction.atomic
    def create(self, validated_data):
        if '_existing' in validated_data.keys():
            return validated_data.get('_existing')
        user=self.context['request'].user
        creator=user.user_membership.filter(members_project__project=validated_data.get('project')).first()
        task_members=validated_data.pop('members',None)
        validated_data['created_by']=creator
        task =super().create(validated_data)
        manager=getattr(models.TaskMember,'objects')
        manager.create(role='admin',task=task,member=task.created_by)

        member_mapping={member.id:member for member in task_members}
        manager.bulk_create([
            models.TaskMember(role='member',member=member,task=task) for member in list(member_mapping.values())
            ])
        message=[
            (
                f'You\'ve been added to a Task',
                f'You were added as member to {task.title.upper()}',
                'noreply@example.com',
                [member.user.email]
                )
            for member in task_members if member.user.email
            ]
        send_mass_mail(message,fail_silently=False)

        return task


        

    def validate(self, attrs):
        user=self.context['request'].user
        if not user.user_membership.filter(members_project__project=attrs.get('project'),members_project__role='admin').exists():
            raise PermissionDenied('you dont have the permissions to perform this operation')
        manager=getattr(models.Task,'objects')
        existing=manager.filter(title=attrs.get('title')).first()
        if existing:
            attrs['_existing']=existing

        return attrs

    def get_comments(self,obj):
        comments_count=obj.comment_task.count()
        return comments_count


class ProjectMemberSerializer(serializers.ModelSerializer):
    member=MembershipSerializer()
    class Meta:
        model=models.ProjectMember
        fields='__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tasks=serializers.SerializerMethodField()
    # project_tasks=serializers.SerializerMethodField()
    project_members=serializers.SerializerMethodField()
    member=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,write_only=True,required=False)
    # project_admins=serializers.SerializerMethodField()
    workspace_name=serializers.SerializerMethodField()
    class Meta:
        model=models.Project
        fields='__all__'
        # fields=[
        #         'id',
        #         'name',
        #         'status',
        #         'workspace',
        #         'workspace_name',
        #         'created_by',
        #         'member',
        #         'project_members',
        #         'description',
        #         'updated_at'
        #         ]
        read_only_fields=['created_by']

    @transaction.atomic
    def create(self, validated_data):
        if '_existing' in validated_data:
            return validated_data['_existing']

        member_to_add=validated_data.pop('member',[])
        workspace=validated_data['workspace']
        project=super().create(validated_data)

        #project member
        creater=self.context['request'].user
        project_member_manager=getattr(models.ProjectMember,'objects')

        #add creator and workspace owner as admin
        admins=workspace.membership.filter(Q(role='owner')|Q(user=creater),workspace=workspace)
        admin_mapping={member.id:member for member in admins}
        project_member_manager.bulk_create([
            models.ProjectMember(project=project,member=member,role='admin') for member in list(admin_mapping.values())
            ])
        #add members
        member_mapping={member.id:member for member in member_to_add}
        manager=getattr(models.Membership,'objects')
        project_member_manager.bulk_create([
            models.ProjectMember(project=project,members=member) for member in list(member_mapping.values())
            ])
        return project


    def validate(self, attrs):
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

    def get_project_members(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()
        members=obj.project_member.all().exclude(member=membership)

        if membership and membership.role != 'owner':
            members=members.exclude(member__role='owner')

        return ProjectMemberSerializer(members,many=True,context=self.context).data


    def get_workspace_name(self,obj):
        return obj.workspace.name
    def get_tasks(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()
        tasks=obj.task_project.filter(task_member__member=membership)
        return [{'id':task.id,'title':task.title,'description':task.description,'priority':task.priority,'comment':task.comment_task.count()} for task in tasks] if tasks else []

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
        projects=obj.projects.filter(project_member__member=workspace_membership)
        # projects=obj.projects.filter(Q(admins=workspace_membership)|Q(members=workspace_membership)).order_by('-updated_at')

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
    invited_by=MembershipSerializer(read_only=True)
    token=serializers.CharField(write_only=True)
    is_valid=serializers.SerializerMethodField()
    class Meta:
        model=models.Invite
        fields='__all__'

    def create(self, validated_data):
        project=validated_data.pop('project',None)
        email=validated_data.pop('email',None)
        workspace=getattr(project,'workspace')
        manager=getattr(models.InviteToken,'objects')
        token,_=manager.get_or_create(token=validated_data.pop('token'),defaults={'workspace':workspace,**validated_data})
        validated_data['token']=token
        user=self.context['request'].user
        invited_by=user.user_membership.filter(workspace=workspace).first()
        invite=models.Invite(invited_by=invited_by,project=project,email=email,**validated_data)
        invite.save()
        manager=getattr(models.InviteTokenAuditLog,'objects')
        manager.create(user=invited_by,token=token)
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


