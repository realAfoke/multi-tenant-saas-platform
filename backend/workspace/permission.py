# from rest_framework.permissions import IsAdminUser
from django.contrib.auth import PermissionDenied
from rest_framework.permissions import SAFE_METHODS, BasePermission
from django.db.models import Q

class IsWorkspaceMemeber(BasePermission):
   def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            raise PermissionDenied('You\' not authenticated')
        if hasattr(obj,'workspace'):
            obj=obj.workspace
        is_member=obj.membership.filter(role__in=['admin','owner','member'],user=request.user).exists()
        is_admin_or_owner=obj.membership.filter(role__in=['owner','admin'],user=request.user).exists()
        if request.method in SAFE_METHODS:
            return is_member
        return is_admin_or_owner


class IsWorkspaceAdminOrSuperAdmin(IsWorkspaceMemeber):
    def has_permission(self, request, view):
        wk=view.kwargs.get('pk')
        user=request.user
        return bool(request.user.is_authenticated and user.user_membership.filter(Q(role='admin') | Q(role='owner'),workspace=wk).exists())


class CommentPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            raise PermissionDenied('You\' not authenticated')
        tk=view.kwargs.get('pk')
        is_member=request.user.task_members.filter(Q(members=request.user)|Q(admins=request.user)).exists()
        return is_member

