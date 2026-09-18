from email.mime import message
from chat.models import ChannelReadStatus, Conversation

class ConsumerService:
    @staticmethod
    def update_message_status(data,user):
        conversation_id=data.get('conversation')
        status=data.get('status',None)
        if not conversation_id:
            return None

        conversation=Conversation.objects.filter(id=conversation_id).first()
        if status == 'received':
            conversation.last_delivered_mssg_id_id=data.get('messageId')
            conversation.save(update_fields=['last_delivered_mssg_id'])
        elif status == 'seen':
            last_msg = conversation.conversation_message.all().order_by('-timestamp').first()

            if conversation.chat_type == 'project':
                ChannelReadStatus.objects.update_or_create(
                    user=user,conversation=conversation,defaults={'message': last_msg})
                return conversation
            user_last_msg=user.message.filter(conversation=conversation_id).order_by('-id').first()

            if not last_msg:
                return None

            if last_msg == user_last_msg:
                return None

            conversation.last_read_mssg_id=last_msg
            conversation.save(update_fields=['last_read_mssg_id'])
        return conversation

