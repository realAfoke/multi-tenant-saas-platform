from rest_framework import generics
from workspace.permission import CommentPermission,IsWorkspaceMemeber,IsWorkspaceAdminOrSuperAdmin
# from .serializers import CommentSerializer, FileSerializer, InviteRequestSerializer, TaskSerializer, WorkSpaceSerializer,ProjectSerializer
from .serializers import CommentSerializer, MembershipSerializer, TaskSerializer,WorkSpaceSerializer,ProjectSerializer,InviteRequestSerializer
from rest_framework.response import Response
from rest_framework import permissions
from workspace import models
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
# from workspace.services.workspace import create_work_space
from channels.layers import get_channel_layer
from workspace.services.invite import send_invite,accept_invite





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
        return models.Membership.objects.filter(workspace=self.kwargs.get('pk'))
    
class WorkSpaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.WorkSpace.objects.all()
    serializer_class=WorkSpaceSerializer
    permission_classes=[IsWorkspaceMemeber]

    def perform_update(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(members=self.request.data.get('members'))


class Project(generics.CreateAPIView):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes=[IsWorkspaceMemeber]


class Task(generics.CreateAPIView):
    queryset=models.Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]

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
@api_view(['POST'])
@permission_classes([IsWorkspaceAdminOrSuperAdmin])
def send_invite_fun(request):
    link=send_invite(request)
    return Response(link)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def accept_invite_fun(request,token,pk):
    resp=accept_invite(request,token,pk)
    return Response(resp)


class GetInviteRequest(generics.ListAPIView):
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]
    serializer_class=InviteRequestSerializer

    def get_queryset(self):
        return models.InviteRequest.objects.filter(workspace=self.kwargs.get('pk'),status='pending')

class AcceptInviteRequest(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.InviteRequest.objects.all()
    permission_classes=[IsWorkspaceAdminOrSuperAdmin]
    serializer_class=InviteRequestSerializer

    def get_object(self):
        return models.InviteRequest.objects.filter(id=self.kwargs.get('invite_pk')).first()

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
#

