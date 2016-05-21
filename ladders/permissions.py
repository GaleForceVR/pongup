from rest_framework import permissions

class IsManagerOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to allow only the Ladder Manager to make changes to the ladder and rankings
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD, or OPTIONS requests.
		if request.method in permissions.SAFE_METHODS:
			return True

		# Write permissions are only allowed to the Ladder Manager
		return obj.ladder.manager == request.user 