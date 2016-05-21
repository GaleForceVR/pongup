from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from ladders.models import Ladder

import datetime

from django.utils import timezone

# Create your models here.
class Match(models.Model):
    ladder = models.ForeignKey(Ladder, default=1)
    name = models.CharField(max_length=200, blank=True, null=True)
    player_a = models.ForeignKey(User, related_name='player_a')
    player_b = models.ForeignKey(User, related_name='player_b')
    player_a_score = models.IntegerField(blank=True, null=True)
    player_b_score = models.IntegerField(blank=True, null=True)
    match_date = models.DateTimeField()
    accepted = models.BooleanField(default=False)
    is_challenge_match = models.BooleanField(default=False)
    alternate_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)      

    def __str__(self):
        player_a_name = self.player_a.first_name + " " + self.player_a.last_name
        player_b_name = self.player_b.first_name + " " + self.player_b.last_name
        # player_a_name = 'hello'
        # player_b_name = self.player_b.first_name
        label = " -- winner: "
        winner = ''
        if self.player_a_score != None and self.player_b_score != None:
            if self.player_a_score < self.player_b_score:
                winner = label + player_b_name + " " + self.player_b_score.__str__() + " - " + self.player_a_score.__str__()
            else:
                winner = label + player_a_name + " " + self.player_a_score.__str__() + " - " + self.player_b_score.__str__()
        return '%s' % (player_a_name + " vs " + player_b_name + winner)
