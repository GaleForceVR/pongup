from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.views import login

from . import views
from .views import UserViewSet, LaddersViewSet, LadderDetailViewSet



# # ViewSets define the view behavior.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = userSerializer





# class PurchaseList(generics.ListAPIView):
#     serializer_class = PurchaseSerializer

#     def get_queryset(self):
#         """
#         This view should return a list of all the purchases
#         for the currently authenticated user.
#         """
#         user = self.request.user
#         return Purchase.objects.filter(purchaser=user)


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, 'User')
router.register(r'ladders', LaddersViewSet)
# router.register(r'ladder', LadderDetailViewSet)
# router.register(r'api/ladder/(?<ladder_id>.+)/$', LadderDetailViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pongup.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^users_ladders/', include('ladders.urls')),
    url(r'user/(?P<pk>[-\d]+)/$', UserViewSet, name='user-detail'),
    url(r'^api/ladder/(?P<pk>[-\d]+)/$', LadderDetailViewSet.as_view({'get': 'list'})),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^matches/', include('matches.urls')),
    # url(r'^ladders/', include('ladders.urls')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # (r'^admin/(.*)', admin.site.urls),
    # url(r'^/*', 'pongup.views.homepage', name='home'),

    # url(r'^login/', 'pongup.views.homepage', name='home'),
    url('^', include('django.contrib.auth.urls')),
    # url(r'^login/$', view=login, kwargs={'template_name': 'login.html'}, name='login'),
    url(r'^ladders/', 'pongup.views.homepage', name='home'),
    url(r'^/?$', 'pongup.views.homepage', name='home'),
)





# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
# urlpatterns = [
    # url(r'^api', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]
