from rest_framework import permissions

class IsPlayerInMatchOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to allow only the two players in a match to update scores
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD, or OPTIONS requests.
		if request.method in permissions.SAFE_METHODS:
			return True

		# Write permissions are only allowed to the two players in the match
		return obj.player_a == request.user or obj.player_b == request.user