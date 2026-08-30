# from rest_framework.permissions import IsAdminUser
from inspect import istraceback
from django.utils.ipv6 import ValidationError
from rest_framework.permissions import SAFE_METHODS, BasePermission
from django.db.models import Q
import logging

import workspace


logger=logging.getLogger(__name__)


class IsWorkspaceMember(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        wk=view.kwargs.get('wk')
        user=request.user
        return request.user.user_membership.filter(workspace_id=view.kwargs.get('wk')).exists()

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        member=request.user.user_membership.filter(workspace=obj).first()
        if not member:
            return False

        if member.role in ['admin','owner']:
            return True

        if member.role == 'member' and request.method in SAFE_METHODS:
            return True



class IsProjectMember(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        wk=view.kwargs.get('pk')
        user=request.user
        return request.user.user_membership.filter(workspace__projects=view.kwargs.get('pk')).exists()

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        is_member=obj.project_member.filter(member__user=request.user).first()
        if not is_member:
            return False

        if is_member.role == 'member' and request.method in SAFE_METHODS:
            return True
        if is_member.role in ['admin','owner'] or request.user.user_membership.filter(workspace_id=obj.workspace_id,role__in=['admin','owner']):
            return True

        print('else nothin was true')

