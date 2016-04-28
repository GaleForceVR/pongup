from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from ladders.models import Ladder, User_Ladder
from matches.models import Match


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        depth = 1
        fields = ('id', 'url', 'username', 'email', 'is_staff', 'password')
        write_only_fields = ('password',)

       	def create(self, validated_data):
       		user = User.objects.create_user(**validated_data)
       		return user

class LaddersSerializer(serializers.ModelSerializer):
	manager = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

	class Meta:
		model = Ladder
		depth = 1
		fields = ('name', 'id', 'manager')

class LadderDetailSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User_Ladder
		depth = 2
		fields = ('user', 'ladder', 'ladder_rank')

class LadderPlayerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User_Ladder
		depth = 1
		fields = ('user', 'ladder')

		# def create(self, validated_data):
		# 	user_ladder = User_Ladder.objects.create(**validated_data)
		# 	return user_ladder

class MatchDetailSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Match 
		depth = 2
		fields = ('id', 'ladder', 'name', 'player_a', 'player_b', 'player_a_score', 'player_b_score', 'match_date')

		def update(self, instance, validated_data):
			instance.id = validated_data.get('id', instance.id)
			instance.player_a_score = validated_data.get('player_a_score', instance.player_a_score)
			instance.player_b_score = validated_data.get('player_b_score', instance.player_b_score)
			instance.save()
			return instance

			# match = Match.objects.get(pk=validated_data)
