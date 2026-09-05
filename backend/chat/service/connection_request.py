from django.db import transaction
from chat.models import ConnectionRequest
from chat.service.chat import ChatService
from django.db.models import Q
from rest_framework.exceptions import ValidationError


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

    @staticmethod
    def create_accept_request(*,sender,recipient=None):
        is_connected=ConnectionRequest.objects.filter(Q(sender=sender)| Q(recipient=sender)).first()
        if is_connected:
            if is_connected.status == 'pending':
                if is_connected.sender == recipient:
                    is_connected.status='accepted'
                elif is_connected.sender == sender:
                    pass
                elif is_connected.status == 'rejected':
                    raise ValidationError("You're blocked.")
        else:
            conversation = ChatService.create_conversation(
                        chat_type='direct',
                        participants=[sender, recipient]
                    )
            connection = ConnectionRequest(
            conversation=conversation,
            sender=sender,
            recipient=recipient,
            status='pending',
            )
            connection.save()
            return conversation
