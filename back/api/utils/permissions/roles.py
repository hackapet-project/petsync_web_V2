# api/utils/permissions/roles.py
from rest_framework.permissions import BasePermission #type: ignore

def is_admin(u): return getattr(u, "role", None) == "ADMIN"
def is_moderator(u): return getattr(u, "role", None) == "MODERATOR"

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and is_admin(request.user))

class IsModeratorSameShelter(BasePermission):
    def has_permission(self, request, view):
        u = request.user
        return bool(u and u.is_authenticated and (is_admin(u) or is_moderator(u)))

    def has_object_permission(self, request, view, obj):
        u = request.user
        if is_admin(u):
            return True
        if is_moderator(u):
            return (getattr(obj, "shelter", "") or "") == (u.shelter or "")
        return False
