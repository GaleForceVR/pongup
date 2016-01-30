from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from . import views
from .views import UserViewSet



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

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pongup.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^users_ladders/', include('ladders.urls')),
    url(r'user/(?P<pk>[-\d]+)/$', UserViewSet, name='user-detail'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^matches/', include('matches.urls')),
    url(r'^ladders/', include('ladders.urls')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # (r'^admin/(.*)', admin.site.urls),
    url(r'^/?$', 'pongup.views.homepage', name='home'),
)





# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
# urlpatterns = [
    # url(r'^api', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]
