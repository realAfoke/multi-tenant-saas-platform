from django.forms import ValidationError
from django.http import HttpResponse, response
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from ..models import Plan,Subscription
from config.settings.permissions import IsFounder
from .serializers import PlanSerializer
from rest_framework import permissions
import stripe
from dotenv import load_dotenv
import os
from datetime import datetime
from rest_framework.response import Response

load_dotenv()



##views start here
client=stripe.StripeClient(os.getenv('STRIPE_SECRET_KEY',''))
class CreatePlans(generics.CreateAPIView):
    queryset=Plan.objects.all()
    serializer_class=PlanSerializer
    permission_classes=[IsFounder]

class GetPlans(generics.ListAPIView):
    queryset=Plan.objects.all()
    serializer_class=PlanSerializer
    permission_classes=[permissions.IsAuthenticated]



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_checkout(request):
    print('GOT HERE')
    plan_id=request.data.get('plan_id')
    workspace_id=request.data.get('workspace_id')
    try:
        plan=Plan.objects.get(id=plan_id)
    except Plan.DoesNotExist:
        return Response('Select a plan to make payment')
    if not request.user.user_membership.filter(workspace_id=workspace_id,role__in=['owner','admin']).exists():
        raise ValidationError('cant make payment to this workspace')

    checkout=client.v1.checkout.sessions.create({
        "mode":"subscription","line_items":[{"price":getattr(plan,'stripe_price_id'),"quantity":1}],"success_url":"http://localhost/success"
        ,"subscription_data":{"metadata":{"workspace_id":workspace_id,"plan_id":plan_id}}})
    print('DONE')
    if hasattr(checkout,'url'):
        return Response({'status':checkout.url})
    return response({"status":"successfull"})
    
@api_view(['PUT','PATCH'])
def cancel_subscription(request,workspace_id):
    subscription=Subscription.objects.filter(workspace_id=workspace_id,status='active')
    client.v1.subscriptions.update(subscription.stripe_subscription_id,{'cancel_at_period_end':True})

    return Response('appologies for any inconvienience your subscriptions will be cancelled shortly')
 
@api_view(['POST'])
def stripe_webhook(request):
    payload=request.body

    sig=request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret=os.getenv('STRIPE_WEBHOOK_SECRET')

    try:
        event=stripe.Webhook.construct_event(payload,sig,endpoint_secret)
    except stripe.APIError:
        return HttpResponse(status=400)

    if event.type== 'customer.subscription.created':
        subscription=event.data.object
        print('SUBSCRIPTION:',subscription)


        workspace_id=subscription.metadata.workspace_id
        Subscription.objects.filter(workspace_id=workspace_id).update(status='cancelled')
        plan_id=subscription.metadata.plan_id
        period_start=datetime.fromtimestamp(subscription.items.data[0].current_period_start)
        period_end=datetime.fromtimestamp(subscription.items.data[0].current_period_end)

        Subscription.objects.create(workspace_id=workspace_id,plan_id=plan_id,stripe_subscription_id=subscription.id,status=subscription.status,current_period_start=period_start,current_period_end=period_end)

    elif event.type == 'customer.subscription.deleted':
        sub=event.data.object
        stripe_sub_id=sub._id
        Subscription.objects.filter(stripe_subscription_id=stripe_sub_id,status='active').update(status='active')

    return HttpResponse({'status':'successfull'})

   
