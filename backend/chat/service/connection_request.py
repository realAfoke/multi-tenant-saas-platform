from django.db import transaction
from chat.models import ConnectionRequest
from chat.service.chat import ChatService


class ConnectionRequestService:
    @staticmethod
    @transaction.atomic
    def send_request(*,iniciater,receiver):
        manager=getattr(ConnectionRequest,'objects')
        #create connection request
        manager.create(
                    iniciater=iniciater,
                    accepter=receiver,
                    status='pending'
                    )
        return None
    @staticmethod
    def accept_request(*,accepter,connection_request):
        with transaction.atomic():
            connection_request.status='accepted'
            connection_request.save(update_fields=['status'])
            ChatService.create_conversation(
                    chat_type='direct',
                    name=f'{connection_request.iniciater.first_name} {connection_request.accepter.first_name}',
                    connection_request=connection_request
                    )
            return None

