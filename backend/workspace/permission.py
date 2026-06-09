# from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import BasePermission
import workspace
from workspace.models import WorkSpace

class IsSuperAdminOrAdmin(BasePermission):

    def has_permission(self, request, view):
        wrk_id=view.kwargs.get('pk')
        workspace=WorkSpace.objects.filter(id=wrk_id).first()
        return bool(workspace.super_admin==request.user or workspace.admins==request.user)

    
    def has_object_permission(self, request, view, obj):
        if hasattr(obj,'work_space'):
            workspace=obj.workspace
            return bool(workspace.super_admin==request.user or workspace.admins.filter(id=request.user).exits())

        return bool(obj.super_admin == request.user or obj.admins == request.user)

class IsCreatorOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.created_by == request.user or obj.project_admins.filter(id=request.user).exist())


class IsWorkspaceMemeber(BasePermission):
    def has_permission(self, request, view):
        wk=view.kwargs.get('pk')
        return bool(request.user.is_authenticated and request.user.user_membership.filter(role__in=['admin','owner','member'],workspace_id=wk))

    def has_object_permission(self, request, view, obj):
        print('OBJ:',obj)
        print('ATTRS:',vars(obj))
        return bool (request.user.is_authenticated and obj.membership.filter(role__in=['owner','admin'],user=request.user))
