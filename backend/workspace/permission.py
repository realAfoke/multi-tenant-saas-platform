# from rest_framework.permissions import IsAdminUser
from inspect import istraceback
from django.utils.ipv6 import ValidationError
from rest_framework.permissions import SAFE_METHODS, BasePermission
from django.db.models import Q
import logging


logger=logging.getLogger(__name__)

class IsWorkspaceMemeber(BasePermission):
   def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if hasattr(obj,'workspace'):
            obj=obj.workspace
        is_member=obj.membership.filter(role__in=['admin','owner','member'],user=request.user).exists()
        is_admin_or_owner=obj.membership.filter(role__in=['owner','admin'],user=request.user).exists()
        if request.method in SAFE_METHODS:
            return is_member
        return is_admin_or_owner


class IsWorkspaceAdminOrSuperAdmin(IsWorkspaceMemeber):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        wk=view.kwargs.get('pk')
        user=request.user
        logger.info(f'user:{request.user}')
        logger.info(f'wkid:{wk}')
        logger.info(list(request.user.user_membership.filter(workspace=wk).values_list('role',flat=True)))
        return bool(user.user_membership.filter(Q(role='admin') | Q(role='owner'),workspace=wk).exists())


class CommentPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        is_member=request.user.task_members.filter(Q(members=request.user)|Q(admins=request.user)).exists()
        return is_member

