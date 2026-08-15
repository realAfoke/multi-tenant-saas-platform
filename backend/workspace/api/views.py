from django.shortcuts import get_object_or_404
from rest_framework import generics
import workspace
from workspace.permission import CommentPermission,IsWorkspaceMemeber,IsWorkspaceAdminOrSuperAdmin
# from .serializers import CommentSerializer, FileSerializer, InviteSerializer, TaskSerializer, WorkSpaceSerializer,ProjectSerializer
from .serializers import CommentSerializer, MembershipSerializer, TaskSerializer,WorkSpaceSerializer,ProjectSerializer,InviteSerializer
from rest_framework.response import Response
from rest_framework import permissions
from workspace import models
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import permissions
# from workspace.services.workspace import create_work_space
from channels.layers import get_channel_layer
from workspace.services.invite import InviteService
import logging






logger=logging.getLogger(__name__)


class DashBoard(generics.ListAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[IsWorkspaceMemeber]

    def get_queryset(self):
        project=models.Project.objects.filter(workspace=self.kwargs.get('wk')).order_by('-updated_at')[0]
        logger.info(f'project:{project}')
        return models.Task.objects.filter(project=project).order_by('-updated_at')[:5]
        # return models.Task.objects.all()


class RoleView(generics.RetrieveAPIView):
    queryset=models.Membership.objects.all()
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=MembershipSerializer

    def get_object(self):
        user=self.request.user
        return user.user_membership.filter(workspace=self.kwargs.get('pk')).first()



class Base(generics.ListCreateAPIView):
    permission_classes=[IsWorkspaceMemeber]
    serializer_class=None
    queryset=None

    instance_model=None
    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        user=self.request.user
        return self.instance_model.objects.filter(members=user).order_by('-updated_at')


class WorkSpace(generics.ListCreateAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return models.WorkSpace.objects.filter(membership__user=self.request.user) 

    
class WorkSpaceMembers(generics.ListAPIView):
    queryset=models.WorkSpace.objects.all()
    permission_classes=[IsWorkspaceMemeber]
    serializer_class=MembershipSerializer

    def get_queryset(self):
        return models.Membership.objects.filter(workspace=self.kwargs.get('wk'))
    
class WorkSpaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[IsWorkspaceMemeber]

    def perform_update(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(members=self.request.data.get('members'))


class Project(generics.ListCreateAPIView):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]

    def get_queryset(self):
        return models.Project.objects.filter(workspace=self.kwargs.get('wk'),members=self.request.user)

    # def perform_create(self, serializer):
    #     serializer.save(project_members=self.request.data.get('project_members'))


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes=[IsWorkspaceMemeber]


class Task(generics.ListCreateAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated,IsWorkspaceAdminOrSuperAdmin]

    def get_queryset(self):
        return models.Task.objects.filter(workspace=self.kwargs.get('wk'),project=self.kwargs.get('pk'))

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Task
    serializer_class=TaskSerializer
    permission_classes=[IsWorkspaceMemeber]

class Comment(generics.ListCreateAPIView):
    queryset=models.Comment.objects.all()
    serializer_class=CommentSerializer
    permission_classes=[CommentPermission]


    def get_queryset(self):
        return models.Comment.objects.filter(task_id=self.kwargs.get('pk')).order_by('-updated_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]
    def post(self,request,*args,**kwargs):
        email=request.data.get('email')
        project_id=request.data.get('project')
        user=request.user
        project=get_object_or_404(models.Project,id=project_id)
        link=InviteService.send_invite(project,email,user,request)
        return Response(link)

class GetInviteView(generics.RetrieveAPIView):
    queryset=models.Invite.objects.all()
    serializer_class=InviteSerializer

class AcceptInviteView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def patch(self,request,pk):
        token=request.data.get('token')
        user=request.user
        invite=get_object_or_404(models.Invite,id=pk)
        InviteService.accept_invite(invite,user,token,request)
        return Response({'detail':'Invite accepted'})




#
# class CreateTask(generics.ListCreateAPIView):
#     queryset=models.Task.objects.all()
#     serializer_class=TaskSerializer
#     permission_classes=[permissions.IsAuthenticated]
#
# class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset=models.Task.objects.all()
#     serializer_class=TaskSerializer
#     permission_classes=[permissions.IsAuthenticated]
