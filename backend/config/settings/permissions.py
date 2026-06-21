from rest_framework.permissions import BasePermission




class IsFounder(BasePermission):
    def has_permission(self, request, view):
        return getattr(request.user,'super_user',False)

