from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LaddersSerializer, LadderDetailSerializer
from rest_framework import routers, serializers, viewsets
from ladders.models import Ladder, User_Ladder
# from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreateForm
from django.core.urlresolvers import reverse

def homepage(request):
    try:
        user_info = User.objects.get(pk=request.user.id)
    except User.DoesNotExist:
        user_info = None
	# return render_to_response('pongup/homepage.html')
    template = loader.get_template('homepage.html')
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

def create_user(request):
    if request.method == 'POST':
        form = UserCreateForm(request.POST)
        if form.is_valid():
            user = form.save()
            from django.contrib.auth import authenticate, login
            user = authenticate(username=form.cleaned_data.get('username'), email=form.cleaned_data.get('email'), password=form.cleaned_data.get('password1'))
            login(request, user)
            return HttpResponseRedirect(reverse('home'))
    else:
        form = UserCreateForm()

    return render_to_response('signup.html', {
        'form': form,
        }, context_instance=RequestContext(request))

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

class LaddersViewSet(viewsets.ModelViewSet):
    queryset = Ladder.objects.all()
    model = Ladder
    serializer_class = LaddersSerializer

class LadderDetailViewSet(viewsets.ModelViewSet):
    queryset = Ladder.objects.all()
    model = User_Ladder
    serializer_class = LadderDetailSerializer

    def get_queryset(self):
        # filter Ladder.objects.all() by provided ladder_id
        ladder_id = self.kwargs['pk']
        # ladder_id = self.request.ladder.id
        # ladder_id = self.request.ladder
        return User_Ladder.objects.filter(ladder_id=ladder_id)

class MyLaddersViewSet(viewsets.ModelViewSet):
    queryset = User_Ladder.objects.all()
    model = User_Ladder
    serializer_class = LadderDetailSerializer

    def get_queryset(self):
        """
        This view should return a list of players in a given ladders
        """
        user_id = self.request.user.id
        return User_Ladder.objects.filter(user_id=user_id)

    