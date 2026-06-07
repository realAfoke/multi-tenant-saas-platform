# from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import BasePermission
from workspace.models import WorkSpace
# from workspace.models import WorkSpace
#
#
# class IsSuperAdminORIsAdmin(IsAdminUser):
#     def has_permission(self, request, view):
#         instance_id=view.kwargs.get('pk')
#         instance=WorkSpace.objects.filter(id=instance_id).first()
#         if not instance:
#             instance=
#         workspace=WorkSpace.objects.filter(id=wrk_id).first()
#         print(workspace.super_admin,request.user)
#         return bool(workspace.super_admin==request.user or workspace.admins==request.user)


class IsSuperAdminOrAdmin(BasePermission):

    def has_permission(self, request, view):
        wrk_id=view.kwargs.get('pk')
        workspace=WorkSpace.objects.filter(id=wrk_id).first()
        return bool(workspace.super_admin=request.user or workspace.admins==request.user)

    
    def has_object_permission(self, request, view, obj):
        if hasattr(obj,'work_space'):
            workspace=obj.workspace
            print('WORKSPACE:',workspace)
            return bool(workspace.super_admin=request.user or workspace.admins==request.user)

        print('OBJ USER:',obj.super_admin)
        print('ADMIN:',obj.admins)
        print('REQUEST USER:',request.user)
        return bool(obj.super_admin == request.user or obj.admins == request.user)

class IsCreatorOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.created_by == request.user or obj.project_admins == request.user)

