from rest_framework import generics
from .serializers import CommentSerializer, FileSerializer, TaskSerializer, WorkSpaceSerializer,ProjectSerializer
from .serializers import UserModel,UserWorkSpacesSerializer,WorkSpaceSerializer
from rest_framework.response import Response
from workspace import models
from rest_framework import permissions
from workspace.services.workspace import create_work_space
from channels.layers import get_channel_layer





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
    permission_classes=[permissions.IsAuthenticated]


class Project(Base):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    instance_model=models.Project 

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Project
    serializer_class=ProjectSerializer
    permission_classes=[permissions.IsAuthenticated]

class Task(Base):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    instance_model=models.Task 


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Task
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated]



class Comment(Base):
    queryset=models.Comment.objects.all()
    serializer_class=CommentSerializer
    instance_model=models.Comment 

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
    def get_queryset(self):
        return self.instance_model.objects.all()


class File(generics.ListCreateAPIView):
    queryset=models.FileAttachment.objects.all()
    serializer_class=FileSerializer
    instance_model=models.FileAttachment 

    def get_queryset(self):
        return self.instance_model.object.all()


