from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework import routers, serializers, viewsets

def homepage(request):
    try:
        user_info = User.objects.get(pk=request.user.id)
    except User.DoesNotExist:
        user_info = None
	# return render_to_response('pongup/homepage.html')
    template = loader.get_template('pongup/homepage.html')
    context = {
		'user_info': user_info,
	}
    return HttpResponse(template.render(context, request))

# def homepage(request):
#     ladders_list = Ladder.objects.order_by('created_at')[:5]
#     template = loader.get_template('ladders/index.html')
#     context = {
#         'ladders_list': ladders_list,
#     }
#     # output = ', '.join([l.name for l in ladders_list])
#     return HttpResponse(template.render(context, request))

# ViewSets define the view behavior.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = userSerializer

class UserViewSet(viewsets.ModelViewSet):
# class UserViewSet(generics.ListAPIView):
    queryset = User.objects.all()
    model = User
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        This view should return the currently authenticated user.
        """
        user_id = self.request.user.id
        user = User.objects.get(pk=user_id)
        return User.objects.filter(id=user_id)
    