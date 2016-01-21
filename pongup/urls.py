from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pongup.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^users_ladders/', include('ladders.urls')),
    url(r'^matches/', include('matches.urls')),
    url(r'^ladders/', include('ladders.urls')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # (r'^admin/(.*)', admin.site.urls),
    url(r'^/?$', 'pongup.views.homepage', name='home'),
)
