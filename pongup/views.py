from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render_to_response

def homepage(request):
    return render_to_response('pongup/homepage.html')
    