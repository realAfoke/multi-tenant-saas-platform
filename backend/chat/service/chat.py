from chat.models import Conversation
from django.db.models import Q
from django.db import transaction
from uuid import uuid4


class Request:
    def __init__(self,user) -> None:
        self.user=user


class ChatService:
    @staticmethod
    def create_conversation(*,chat_type,name=None,workspace=None,project=None,participants=None):
        with transaction.atomic():
            conversation_id=str(uuid4())
            if chat_type == 'direct':
                conversation=Conversation(
                        chat_type=chat_type,
                        conversation_id=conversation_id
                        )
                conversation.save()
                conversation.participants.add(*participants)

            conversation=Conversation(
                        chat_type=chat_type,
                        name=name,
                        workspace=workspace,
                        project=project,
                        conversation_id=conversation_id
                        )
            conversation.save()
            return conversation


    

