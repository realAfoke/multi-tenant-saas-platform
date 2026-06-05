from rest_framework.permissions import IsAdminUser
from workspace.models import WorkSpace


class IsSuperAdminORIsAdmin(IsAdminUser):
    def has_permission(self, request, view):
        wrk_id=view.kwargs.get('wk')
        workspace=WorkSpace.objects.filter(id=wrk_id).first()
        print(workspace.super_admin,request.user)
        return bool(workspace.super_admin==request.user or workspace.admins==request.user)

