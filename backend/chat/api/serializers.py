from os import getuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from chat.models import Conversation,Message,MessageReaction,MessageReciept,Attachment
from django.contrib.auth import get_user_model
from workspace.models import Membership
from users.api.serializers import UserSerializer
from workspace.api.serializers import ProjectMemberSerializer


User=get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    project=serializers.SerializerMethodField()
    workspace=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    class Meta:
        model=Message
        fields='__all__'

    def get_project(self,obj):
        return obj.conversation.project.id if obj.conversation.project else None
    def get_workspace(self,obj):
        return obj.conversation.workspace.id if obj.conversation.workspace else None
    def get_user(self,obj):
        if obj.conversation.workspace:
            project_member=obj.conversation.project.project_member.filter(member__user=obj.sender).first()
            return ProjectMemberSerializer(project_member).data
        else:
            return UserSerializer(obj.sender).data
