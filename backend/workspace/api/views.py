from rest_framework import generics
from rest_framework.views import APIView
from workspace.permission import IsSuperAdminOrAdmin, IsCreatorOrAdmin
from .serializers import CommentSerializer, FileSerializer, InviteRequestSerializer, TaskSerializer, WorkSpaceSerializer,ProjectSerializer
from .serializers import UserModel,UserWorkSpacesSerializer,WorkSpaceSerializer
from rest_framework.response import Response
from workspace import models
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from workspace.services.workspace import create_work_space
from channels.layers import get_channel_layer
from workspace.services.invite import send_invite,accept_invite





class Base(generics.ListCreateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=None
    queryset=None

    instance_model=None
    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        user=self.request.user
        return self.instance_model.objects.filter(members=user).order_by('-updated_at')


##fetch all user's workspace
class UserWorkSpaces(generics.ListAPIView):
    queryset=UserModel.objects.all()
    serializer_class=UserWorkSpacesSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return UserModel.objects.filter(id=user.id)

##create new workspace
class CreateWorkSpace(generics.CreateAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):
        create_work_space(self.request,serializer)

class WorkSpaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[IsSuperAdminOrAdmin]

    def perform_update(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(members=self.request.data.get('members'))


class Project(Base):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    instance_model=models.Project 


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Project
    serializer_class=ProjectSerializer
    permission_classes=[IsCreatorOrAdmin]

class Task(Base):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated]
    instance_model=models.Task 


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Task
    serializer_class=TaskSerializer
    permission_classes=[IsCreatorOrAdmin]



class Comment(Base):
    queryset=models.Comment.objects.all()
    serializer_class=CommentSerializer
    instance_model=models.Comment 

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
    def get_queryset(self):
        return self.instance_model.objects.all()


class File(Base):
    queryset=models.FileAttachment.objects.all()
    serializer_class=FileSerializer
    instance_model=models.FileAttachment 

    def get_queryset(self):
        return self.instance_model.object.all()


class ProcessInvite(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def post(self,request,*args,**kwargs):
        link=send_invite(request)
        return Response(link)
    def get(self,request,*args,**kwargs):
        resp=accept_invite(request,*args,**kwargs)
        return Response(resp)

class GetInviteRequest(generics.ListAPIView):
    permission_classes=[IsSuperAdminOrAdmin]
    serializer_class=InviteRequestSerializer

    def get_queryset(self):
        return models.InviteRequest.objects.filter(workspace=self.kwargs.get('wk'),status='pending')

class AcceptInviteRequest(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[IsSuperAdminOrAdmin]
    serializer_class=InviteRequestSerializer

    def get_object(self):
        return models.InviteRequest.objects.filter(id=self.kwargs.get('pk')).first()


class CreateTask(generics.ListCreateAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated]

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated]


