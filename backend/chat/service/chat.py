
from asgiref.sync import sync_to_async,async_to_sync
from chat.models import Conversation
from chat.api.serializers import MessageSerializer
from django.db.models import Q
from django.db import transaction


class Request:
    def __init__(self,user) -> None:
        self.user=user

@transaction.atomic
def process_chat(data,user):
    request=Request(user)
    convo_manager=getattr(Conversation,'objects')
    conversation=convo_manager.filter(Q(project=data.get('project')) | Q(pk=data.get('id'))).first()
    conversation_type=conversation.chat_type
    if conversation.chat_type == 'project':
        if not conversation.project.project_member.filter(member__user=user).first():
            return {'error':"you're a member of this conversation"}
    else:
        if not conversation.participants.filter(id=user.id):
            return {'error':"you're a member of this conversation"}

    #save message
    data['conversation']=conversation.id
    data['sender']=user.id
    serializer=MessageSerializer(data=data,context={'request':request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data

