from enum import member
from functools import partial
from typing_extensions import ReadOnly
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
from rest_framework import generics
import manage
import workspace
from workspace.permission import IsChannelMember, IsWorkspaceMember
# from .serializers import CommentSerializer, FileSerializer, InviteSerializer, TaskSerializer, WorkSpaceSerializer,ChannelSerializer
from .serializers import  ChannelMemberSerializer, CommentSerializer, MembershipSerializer, TaskSerializer,WorkSpaceSerializer,ChannelSerializer,InviteSerializer
from rest_framework.response import Response
from rest_framework import permissions
from workspace import models
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import permissions
# from workspace.services.workspace import create_work_space
from channels.layers import channel_layers, get_channel_layer
from workspace.services.invite import InviteService
import logging
import pprint


logger=logging.getLogger(__name__)

# class DashBoard(generics.ListAPIView):
#     queryset=models.Task.objects.all()
#     serializer_class=TaskSerializer
#     permission_classes=[IsWorkspaceMember]
#
#     def get_queryset(self):
#         channel=models.Channel.objects.filter(workspace=self.kwargs.get('wk')).order_by('-updated_at')[0]
#         logger.info(f'channel:{channel}')
#         return models.Task.objects.filter(channel=channel).order_by('-updated_at')[:5]
#         # return models.Task.objects.all()
#

class RoleView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Membership.objects.all()
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=MembershipSerializer

    def get_object(self):
        user=self.request.user
        return user.user_membership.filter(workspace=self.kwargs.get('pk')).first()

class WorkSpace(generics.ListCreateAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return models.WorkSpace.objects.filter(membership__user=self.request.user) .order_by('-updated_at')

    
class WorkSpaceMembers(generics.ListAPIView):
    queryset=models.WorkSpace.objects.all()
    permission_classes=[IsWorkspaceMember]
    serializer_class=MembershipSerializer

    def get_queryset(self):
        return models.Membership.objects.filter(workspace=self.kwargs.get('wk'))

class UpdateWorkspaceMembershipRole(generics.RetrieveUpdateDestroyAPIView):
    manager=getattr(models.Membership,'objects')
    queryset=manager.all()
    permission_classes=[IsWorkspaceMember]
    serializer_class=MembershipSerializer

    def get_object(self):
        return get_object_or_404(models.Membership,id=self.request.data.get('member_id'),workspace_id=self.kwargs.get('wk'))

class WorkSpaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[IsWorkspaceMember]

    def get_object(self):
        return get_object_or_404(models.WorkSpace,pk=self.kwargs.get('wk'))

    def perform_update(self, serializer):
        serializer.save(members=self.request.data.get('members'))

class GetCreateChannelView(generics.ListCreateAPIView):
    queryset=models.Channel.objects.all()
    serializer_class=ChannelSerializer
    permission_classes=[IsWorkspaceMember]

    def get_queryset(self):
        return models.Channel.objects.filter(workspace=self.kwargs.get('wk'),members=self.request.user)

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()
        members=serializer.validated_data.get('member',None)
        
        members_ids=[]
        channel=get_channel_layer()
        if members:
            for member in members:
                members_ids.append(member.user.id)
                serializer.data['tag']='new channel'
                async_to_sync(channel.group_send)(f'user_{member.user.id}',{'type':'send.channel','channel':serializer.data})

    # def perform_create(self, serializer):
    #     serializer.save(channel_members=self.request.data.get('channel_members'))


class ChannelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Channel.objects.all()
    serializer_class=ChannelSerializer
    permission_classes=[IsChannelMember]


class ChannelMembers(generics.ListCreateAPIView):
    manager=getattr(models.ChannelMember,'objects')
    queryset=manager.all()
    serializer_class=ChannelMemberSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return self.manager.filter(channel=self.kwargs.get('pk'))

    def perform_create(self, serializer):
        channel=get_channel_layer()
        serializer.save(channel_id=self.kwargs['pk'])
        workspace=models.WorkSpace.objects.filter(channels=self.kwargs['pk']).first()
        if workspace:
            async_to_sync(channel.group_send)(f'workspace_{workspace.id}',{'type':'send.member',"member":serializer.data})
        ##send channel to newly added member
        channel_data=models.Channel.objects.filter(id=self.kwargs['pk']).first()
        serializer=ChannelSerializer(channel_data,context={'request':self.request})
        user=self.request.data.get('member_id')
        group_name=f'user_{user}'
        async_to_sync(channel.group_send)(group_name,{"type":"send.channel","channel":serializer.data})

class GetCreateTaskView(generics.ListCreateAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated,IsChannelMember]

    def get_queryset(self):
        return models.Task.objects.filter(channel=self.kwargs.get('pk'))


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Task
    serializer_class=TaskSerializer
    permission_classes=[IsChannelMember]

    def get_object(self):
        return get_object_or_404(
                models.Task,
                id=self.kwargs.get('tk'),
                channel_id=self.kwargs.get('pk'),
                )

class Comment(generics.ListCreateAPIView):
    queryset=models.Comment.objects.all()
    serializer_class=CommentSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Comment.objects.filter(task_id=self.kwargs.get('pk')).order_by('-updated_at')

    

# class File(Base):
#     queryset=models.FileAttachment.objects.all()
#     serializer_class=FileSerializer
#     instance_model=models.FileAttachment 
#
#     def get_queryset(self):
#         return self.instance_model.object.all()
#
#
class SendInviteView(APIView):
    permission_classes=[IsWorkspaceMember]
    def post(self,request,*args,**kwargs):
        link=InviteService.send_invite(request)
        return Response(link)

class GetInviteView(generics.ListAPIView):
    manager=getattr(models.Invite,'objects')
    queryset=manager.all()
    serializer_class=InviteSerializer

    def get_queryset(self):
        return  self.manager.filter(workspace=self.kwargs.get('pk')).exclude(status='Accepted')

class AcceptInviteView(APIView):
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def patch(self,request,pk):
        token=request.data.get('token')
        user=request.user
        invite=get_object_or_404(models.Invite,id=pk)
        InviteService.accept_invite(invite,user,token,request)
        return Response({'detail':'Invite accepted'})

    def get(self,request,pk,*args,**kwargs):
        invite=get_object_or_404(models.Invite,id=pk)
        serializer=InviteSerializer(invite,context={'request':request})
        return Response(serializer.data)

# class WorkspaceActivity(generics.ListAPIView):
#     manager=getattr(models.ActivityLog,'objects')
#     queryset=manager.all()
#     serializer_class=ActivityLogSerializer
#     permission_classes=[permissions.IsAuthenticated]
#
#     def get_queryset(self):
#       
