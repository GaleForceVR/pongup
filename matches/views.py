from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# from .models import Match

# Create your views here.
def index(request):
    return HttpResponse("Matches Index page")
