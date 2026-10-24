from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from chat.service.chat import ChatService
from django.db.models import Q, QuerySet
from django.core.mail import send_mail,send_mass_mail
import logging
from django.db import transaction
from chat.models import Conversation
from workspace import models
from uuid import uuid4


logger=logging.getLogger(__name__)
UserModel=get_user_model()

class MembershipSerializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    channels=serializers.SerializerMethodField()
    class Meta:
        model=models.Membership
        fields=['id','role','user','channels']

    def get_user(self,obj):
        user=obj.user
        return {'id':user.id,'first_name':user.first_name,'last_name':user.last_name,'email':user.email}

    def get_channels(self,obj):
        channels=obj.members_channel.all()
        if channels:
            return [channel.id for channel in channels]
        return None
 
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
    check_list=serializers.ListField(required=False)
    due_date=serializers.DateField(required=False,allow_null=True)
    members=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,write_only=True,required=False)
    workspace=serializers.PrimaryKeyRelatedField(read_only=True)
    # comment_task=CommentSerializer(many=True,read_only=True)
    class Meta:
        model=models.Task
        fields='__all__'

    @transaction.atomic
    def create(self, validated_data):
        if '_existing' in validated_data.keys():
            return validated_data.get('_existing')
        user=self.context['request'].user
        print('VALIDATED DATA:',validated_data)
        creater=user.user_membership.filter(members_channel__channel=validated_data.get('channel')).first()
        task_members=validated_data.pop('members',None)
        validated_data['created_by']=creater
        if len(task_members) > 0:
            validated_data['is_general']=False
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
        print('ATTRS:',attrs)
        if self.instance:
             member=self.instance.channel.channel_member.filter(member__user=user).first()
             if not member.role in ['admin','owner']:
                 raise PermissionDenied('you dont have the permissions to perform this operation')
             return attrs
        if not user.user_membership.filter(members_channel__channel=attrs.get('channel'),members_channel__role='admin').exists():
            raise PermissionDenied('you dont have the permissions to perform this operation')
        manager=getattr(models.Task,'objects')
        existing=manager.filter(title=attrs.get('title')).first()
        if existing:
            attrs['_existing']=existing
        attrs['workspace']=attrs.get('channel').workspace
        return attrs

    def update(self, instance, validated_data):
        changes={}
        for field,new_value in validated_data.items():
            old_value=getattr(instance,field)
            if old_value != new_value:
                changes[field]=field

        ids=validated_data.pop('check_list')
        if ids:
            check_list=instance.check_list
            for id in ids:
                for check_item in check_list:
                    if check_item['id'] == id:
                        check_item['status']=True
            instance._changes=changes
            instance._updated_by=self.context['request'].user
            instance.save()
        return super().update(instance,validated_data)

    def get_comments(self,obj):
        comments_count=obj.comment_task.count()
        return comments_count


class ChannelMemberSerializer(serializers.ModelSerializer):
    member=MembershipSerializer(read_only=True)
    member_id=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),source='member',write_only=True)
    class Meta:
        model=models.ChannelMember
        fields='__all__'

class ChannelSerializer(serializers.ModelSerializer):
    tasks=serializers.SerializerMethodField()
    channel_members=serializers.SerializerMethodField()
    member=serializers.PrimaryKeyRelatedField(queryset=models.Membership.objects.all(),many=True,write_only=True,required=False)
    workspace_name=serializers.SerializerMethodField()
    conversation=serializers.SerializerMethodField()
    # conversation=serializers.PrimaryKeyRelatedField(source="channel_conversation",read_only=True)
    # unread=serializers.SerializerMethodField()
    class Meta:
        model=models.Channel
        fields='__all__'
        read_only_fields=['created_by']

    @transaction.atomic
    def create(self, validated_data):
        if '_existing' in validated_data:
            return validated_data['_existing']

        member_to_add=validated_data.pop('member',[])
        workspace=validated_data['workspace']
        channel=super().create(validated_data)

        #channel member
        creater=self.context['request'].user
        channel_member_manager=getattr(models.ChannelMember,'objects')

        #add creator and workspace owner as admin
        admins=workspace.membership.filter(Q(role='owner')|Q(user=creater),workspace=workspace)
        admin_mapping={member.id:member for member in admins}
        channel_member_manager.bulk_create([
            models.ChannelMember(channel=channel,member=member,role='admin') for member in list(admin_mapping.values())
            ])
        #add members
        member_mapping={member.id:member for member in member_to_add}
        manager=getattr(models.Membership,'objects')
        channel_member_manager.bulk_create([
            models.ChannelMember(channel=channel,member=member) for member in list(member_mapping.values())
            ])
        #create channel discussion room
        ChatService.create_conversation(chat_type='channel',name=validated_data.get('name'),workspace=workspace,channel=channel)

        return channel


    def validate(self, attrs):
        current_user=self.context['request'].user
        workspace=attrs.get('workspace')
        membership=current_user.user_membership.filter(workspace=workspace).first()
        if membership.role not in {'admin','owner'}:
            raise PermissionDenied('you dont have permission to perform this operation')
        manager=getattr(models.Channel,'objects')
        existing=manager.filter(workspace=workspace,name=attrs.get('name'),created_by=membership).first()
        if existing:
            attrs['_existing']=existing
        attrs['created_by']=membership
        return attrs

    def get_channel_members(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()
        members=obj.channel_member.all().exclude(member=membership)

        if membership and membership.role != 'owner':
            members=members.exclude(member__role='owner')

        return ChannelMemberSerializer(members,many=True,context=self.context).data


    def get_workspace_name(self,obj):
        return obj.workspace.name
    def get_tasks(self,obj):
        current_user=self.context['request'].user
        membership=current_user.user_membership.filter(workspace=obj.workspace).first()
        tasks=obj.channel_task.filter(task_member__member=membership)
        return [{'id':task.id,'title':task.title,'description':task.description,'priority':task.priority,'comment':task.comment_task.count()} for task in tasks] if tasks else []

    def get_conversation(self,obj):
        from chat.api.serializers import ConversationSerializer
        convo=getattr(obj,'channel_conversation',None)
        if convo is None:
            return None
        return ConversationSerializer(convo,context=self.context).data

    # def get_unread(self,obj):
    #     user=self.context['request'].user
    #     last_mssg_read=user.user_reciept.filter(conversation__channel=obj).first()
    #     print('last_mssg_read:',last_mssg_read)
    #     return None


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
    channels=serializers.SerializerMethodField()
    pinned_channels=serializers.SerializerMethodField()
    # channel_ids=serializers.PrimaryKeyRelatedField(source='channels',many=True,read_only=True)
    class Meta:
        model=models.WorkSpace
        # fields=['id','name','description','channels','created_at','updated_at']
        fields='__all__'
        read_only_fields=['channels']

    @transaction.atomic
    def create(self, validated_data):
        owner=self.context['request'].user
        if '_existing' in validated_data:
            return validated_data['_existing']
        manger=getattr(models.WorkSpace,'objects')
        workspace=manger.create(**validated_data)
        member=models.Membership(workspace=workspace,user=owner,role='owner')
        member.save()
        ## create general channel on workspace creation
        serializer=ChannelSerializer(data={'workspace':workspace.id,'name':'general','description':'general channel','is_public':True},context=self.context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
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
                raise PermissionDenied('you dont have permission to perform this operation')
            if len(self.instance.membership.all()) > 500:
                raise ValidationError('workspace membership limmit reached')
            return attrs
    def get_channels(self,obj):
        from chat.api.serializers import ConversationSerializer
        user=self.context['request'].user
        workspace_membership=user.user_membership.filter(workspace=obj).first()
        # channels=obj.channels.filter(channel_member__member=workspace_membership).order_by('-updated_at')
        channels=obj.channels.filter(Q(channel_member__member=workspace_membership) | Q(is_public=True),is_pinned=False).order_by("-channel_conversation__updated_at")
        # channels=obj.channels.filter(Q(admins=workspace_membership)|Q(members=workspace_membership)).order_by('-updated_at')
        # for channel in channels:
            # print('conversation:',getattr(channel,'channel_conversation',None))

        return [{
            'id':channel.id,
            'name':channel.name,
            'status':channel.status,
            'is_pinned':channel.is_pinned,
            'description':channel.description,
            'conversation':(ConversationSerializer(channel.channel_conversation,context=self.context).data if hasattr(channel,'channel_conversation') else None),
            'membersCount':obj.membership.count()  if channel.is_public else channel.channel_member.count(),
            'updated_at':channel.updated_at,
            'created_on':channel.created_at
            } 
            for channel in channels
                ]
    def get_pinned_channels(self,obj):
        from chat.api.serializers import ConversationSerializer
        user=self.context['request'].user
        workspace_membership=user.user_membership.filter(workspace=obj).first()

        channels=obj.channels.filter(Q(channel_member__member=workspace_membership) | Q(is_public=True),is_pinned=True).order_by("-channel_conversation__updated_at")

        return [{
            'id':channel.id,
            'name':channel.name,
            'status':channel.status,
            'is_pinned':channel.is_pinned,
            'description':channel.description,
            'conversation':(ConversationSerializer(channel.channel_conversation,context=self.context).data if hasattr(channel,'channel_conversation') else None),
            'updated_at':channel.updated_at,
            'created_on':channel.created_at
            } 
            for channel in channels
                ]
       

   
# class FileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.FileAttachment
#         fields='__all__'
#
#
#     def validate(self, attrs):
#         user=self.context['request'].user
#         workspace=attrs['work_space']
#         channel=attrs['channel']
#         task=attrs['task']
#         if not workspace.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not channel.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')
#         if not task.members.filter(id=user.id).exists():
#             raise PermissionDenied('you dont have permission to perform this operation')




class TokenAuditTrailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.InviteTokenAuditLog
        fields=['id','token','action']


class InviteSerializer(serializers.ModelSerializer):
    workspace=serializers.PrimaryKeyRelatedField(queryset=models.WorkSpace.objects.all())
    channel_name=serializers.CharField(source='channel.name',read_only=True)
    inviter=MembershipSerializer(read_only=True)
    token=serializers.CharField(write_only=True)
    is_valid=serializers.SerializerMethodField()
    workspace_name=serializers.SerializerMethodField()
    class Meta:
        model=models.Invite
        fields='__all__'

    def create(self, validated_data):
        ##create or get new token 
        manager=getattr(models.InviteToken,'objects')
        token,_=manager.get_or_create(token=validated_data.pop('token'),defaults={'workspace':validated_data['workspace']})
        ##create invite
        invite=models.Invite(token=token,**validated_data)
        invite.save()
        ##create invite log
        manager=getattr(models.InviteTokenAuditLog,'objects')
        manager.create(user=invite.inviter,token=token)
        return invite

    def get_is_valid(self,obj):
        token=obj.token
        return token.no_used <= 0 and not token.revoked

    def get_inviter(self,obj):
        return obj.invitd_by.invite.values('id','first_name','last_name')
    
    def get_workspace_name(self,obj):
        return obj.workspace.name

    def update(self, instance, validated_data):
        if validated_data.get('status') == 'accept':
            workspace=getattr(self.instance,'workspace')
            wk_members_count=workspace.membershipt.count()
            plan_limit=workspace.subscription.filter(status='active').first().plan.members_limit
            if wk_members_count >= plan_limit:
                raise ValidationError('Members limit exceeded for this plan, upgrade your plan to add/accept more user invite')
            channel=getattr(self.instance,'channel')
            channel.members.add(instance.pending_user)
            # wk_memb=models.Membership.objects.create(workspace=channel.workspace,user=instance.pending_user,role='member')
            instance.status=validated_data.get('status')
            channel.save()
            instance.save()
        return instance


# class ActivityLogSerializer(serializers.ModelSerializer):
#     channel_info=serializers.SerializerMethodField()
#     class Meta:
#         model=models.ActivityLog
#         fields='__all__'
#
#
#     def get_channel_info(self,obj):
#         return {'name':obj.channel.name} if obj.channel else None
#
# https://localhost:5173/accept-invite/?token=qC60Kjn87lyLxqr7_x4rlUDZishbfivU_wxWmiaWRQU&invite=1
