
from django.db import transaction
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework import status
from chat.models import ConnectionRequest,Conversation


class MessageService:
    @staticmethod
    @transaction.atomic
    def validate_message(*,user,conversation_id,receiver):
        if conversation_id:
            manager=getattr(Conversation,'objects')
            conversation=manager.filter(conversation_id=conversation_id).first()

            if conversation and conversation.project:
                if not conversation.project.project_members.filter(member_user=user).exists():
                    raise ValidationError('User is not a member of this chat.')
                return conversation
        manager=getattr(ConnectionRequest,'objects')
        connection=manager.filter(Q(iniciater=user) | Q(accepter=user)).exists()
        if not connection:
            #create connection request
            manager.create(
                    iniciater=user,
                    accepter=receiver,
                    status='pending'
                    )
        return None

