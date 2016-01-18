from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /ladders/
    url(r'^$', views.index, name='index'),

    # ex: /ladders/5/
    url(r'^(?P<ladder_id>[0-9]+)/$', views.detail, name='detail'),

    # ex: /ladders/5/results/
    url(r'^(?P<ladder_id>[0-9]+)/results/$', views.results, name='results'),

    # ex: /users_ladders/
    # url(r'^users_ladders/$', views.users_ladders, name='users_ladders'),
]
