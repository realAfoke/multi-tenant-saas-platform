from django.core.management.base import BaseCommand
from stripe import StripeClient
from billing.management.commands.plans import billing_plan
import os
from billing.models import Plan
from dotenv import load_dotenv

load_dotenv()


class Command(BaseCommand):
    client=StripeClient(os.getenv('STRIPE_SEC_KEY'))
    def handle(self, *args, **options):
        for plan in billing_plan:
            if 'price' not in plan:
                continue
            # print('PLAN',plan)
            products=self.client.v1.products.create({'name':plan['name']})
            price=self.client.v1.prices.create({"product":products.id,"unit_amount":plan["price"] * 100,"currency":"NGN","recurring":{"interval":"month"}})
            plan["stripe_product_id"]=getattr(products,'id')
            plan["stripe_price_id"]=getattr(price,'id')
            Plan.objects.create(**plan)


