from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from ladders.models import Ladder, User_Ladder


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        depth = 1
        fields = ('url', 'username', 'email', 'is_staff', 'password')
        write_only_fields = ('password',)

       	def create(self, validated_data):
       		user = User.objects.create_user(**validated_data)
       		return user

class LaddersSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Ladder
		depth = 1
		fields = ('name',)

class LadderDetailSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User_Ladder
		depth = 2
		fields = ('user', 'ladder', 'ladder_rank')
