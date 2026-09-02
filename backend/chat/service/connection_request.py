from django.db import transaction
from chat.models import ConnectionRequest
from chat.service.chat import ChatService
from django.db.models import Q


class ConnectionRequestService:
    @staticmethod
    def send_request(*,sender,recipient):
        with transaction.atomic():
            manager=getattr(ConnectionRequest,'objects')
            #create connection request
            connection=manager.filter(Q(sender=sender,recipient=recipient) | Q(sender=recipient,recipient=sender)).first()
            if not connection:
                connection=manager.create(
                            sender=sender,
                            recipient=recipient,
                            status='pending'
                            )
            return connection

    @staticmethod
    def accept_request(*,recipient,connection_request):
        with transaction.atomic():
            connection_request.status='accepted'
            connection_request.save(update_fields=['status'])
            ChatService.create_conversation(
                    chat_type='direct',
                    name=f'{connection_request.sender.first_name} {connection_request.recipient.first_name}',
                    connection_request=connection_request
                    )
            return None

