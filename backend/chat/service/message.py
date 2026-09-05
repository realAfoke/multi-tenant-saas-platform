
from django.db import transaction
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework import status
from chat.models import ConnectionRequest,Conversation
from chat.service.connection_request import ConnectionRequestService


class MessageService:
    @staticmethod
    def validate_message(*,user,conversation_id,receiver):
        with transaction.atomic():
            if conversation_id:
                manager=getattr(Conversation,'objects')
                conversation=manager.filter(conversation_id=conversation_id).first()

                if conversation and conversation.project:
                    if not conversation.project.project_members.filter(member_user=user).exists():
                        raise ValidationError('User is not a member of this chat.')
                if not conversation.participants.filter(id=user.id):
                    raise ValidationError('User is not a member of this chat')
                return conversation

