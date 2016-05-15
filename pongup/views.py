from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LaddersSerializer, LadderDetailSerializer, MatchDetailSerializer, LadderPlayerSerializer
from rest_framework import routers, serializers, viewsets
from ladders.models import Ladder, User_Ladder
from matches.models import Match
# from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreateForm
from django.core.urlresolvers import reverse

from rest_framework import filters
from rest_framework import generics
from rest_framework import permissions
from matches.permissions import IsPlayerInMatchOrReadOnly
from rest_framework import mixins

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
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter)
    ordering = ('-created_at',)

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def post(self, request, *args, **kwargs):
    #     manager = User.objects.get(pk=request.args.manager)
    #     name = self.request.name
    #     return self.create(manager=manager, name=name)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save()

    # def get_success_headers(self, data):
    #     try: 
    #         return {'Location': data[api_settings.URL_FIELD_NAME]}
    #     except (TypeError, KeyError):
    #         return {}

    def post(self, request, format=None):
        name = request.data.name
        manager_id = User.objects.get(pk=request.data.manager_id)

        serializer = LaddersSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(name=name, manager_id=manager_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, serializer):
    #     # user_ladder = User_Ladder.objects.get(pk=self.kwargs['pk'])
    #     # ladder = Ladder.objects.get(pk=self.kwargs['pk'])
    #     name = self.request.params.name
    #     serializer.save(manager=self.request.user, name=name)

    # def perform_create(self, serializer):
    #     # manager = User.objects.get(pk=serializer.data['manager_id'])
    #     serializer = LaddersSerializer(data=serializer.data)
    #     if serializer.is_valid(raise_exception=True):
    #         # ladder = serializer.save()
    #         # data = serializer.data
    #         # manager = User.objects.get(pk=13)
            
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, serializer):
    # # user_ladder = User_Ladder.objects.get(pk=self.kwargs['pk'])
    # ladder = Ladder.objects.get(pk=self.kwargs['pk'])
    # serializer.save(user=self.request.user, ladder=ladder)

    # def perform_create(self, serializer):
    #     # user_ladder = User_Ladder.objects.get(pk=self.kwargs['pk'])
    #     ladder = Ladder.objects.get(pk=self.kwargs['pk'])
    #     serializer.save(user=self.request.user, ladder=ladder)

class LadderDetailViewSet(viewsets.ModelViewSet):
    queryset = Ladder.objects.all()
    model = User_Ladder
    serializer_class = LadderDetailSerializer
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter)
    ordering = ('ladder_rank',)

    def get_queryset(self):
        # filter Ladder.objects.all() by provided ladder_id
        ladder_id = self.kwargs['pk']
        # ladder_id = self.request.ladder.id
        # ladder_id = self.request.ladder
        return User_Ladder.objects.filter(ladder_id=ladder_id)

class UserLadderViewSet(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        # mixins.DestroyModelMixin,
                        generics.GenericAPIView):
    queryset = User_Ladder.objects.all()
    # model = User_Ladder
    serializer_class = LadderDetailSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # def put(self, request, pk, format=None):
    #     user_ladder = self.get_object(pk)
    #     serializer = LadderDetailSerializer(user_ladder, data=request.data, context={'request': request})
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class LadderMatchesViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    model = Match
    serializer_class = MatchDetailSerializer

    def get_queryset(self):
        """
        This view should return a list of match cleaned_data
        """
        user_id = self.request.user.id
        ladder_id = self.kwargs['pk']
        return Match.objects.filter(ladder_id=ladder_id)

class LadderPlayersViewSet(viewsets.ModelViewSet):
    queryset = User_Ladder.objects.all()
    model = User_Ladder
    serializer_class = LadderPlayerSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def get_queryset(self):
    #     """
    #     This view should return a list of players in a given ladder
    #     """
    #     ladder_id = self.kwargs['pk']
    #     return User_Ladder.objects.filter(ladder_id=ladder_id)

    def post(self, request, format=None):
        serializer = LadderPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        # user_ladder = User_Ladder.objects.get(pk=self.kwargs['pk'])
        ladder = Ladder.objects.get(pk=self.kwargs['pk'])
        serializer.save(user=self.request.user, ladder=ladder)

class MatchesDetailViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    model = Match
    serializer_class = MatchDetailSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsPlayerInMatchOrReadOnly,)

    def get_queryset(self, *args, **kwargs):
        """
        This view should return a list of match cleaned_data
        """
        match_id = self.kwargs['pk']
        return Match.objects.filter(pk=match_id)
    