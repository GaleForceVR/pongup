from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Ladder, User_Ladder

# Create your views here.
# def index(request):
#     ladders_list = Ladder.objects.order_by('created_at')[:5]
#     template = loader.get_template('ladders/index.html')
#     context = {
#         'ladders_list': ladders_list,
#     }
#     # output = ', '.join([l.name for l in ladders_list])
#     return HttpResponse(template.render(context, request))

# def detail(request, ladder_id):
#     return HttpResponse("You're looking at ladder %s." % ladder_id)

# def results(request, ladder_id):
#     response = "You're looking at the results of ladder %s."
#     return HttpResponse(response % ladder_id)

# def users_ladders(request, ladder_id):
#     return HttpResponse("users_ladders")
