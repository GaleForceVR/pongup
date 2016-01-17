from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pongup.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^ladders/', include('ladders.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^/?$', 'pongup.views.homepage', name='home'),
)
