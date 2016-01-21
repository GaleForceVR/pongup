from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from ladders.models import Ladder

import datetime

from django.utils import timezone

# Create your models here.
class Match(models.Model):
    ladder = models.ForeignKey(Ladder)
    name = models.CharField(max_length=200)
    player_a = models.ForeignKey(User, related_name='player_a')
    player_b = models.ForeignKey(User, related_name='player_b')
    player_a_score = models.IntegerField()
    player_b_score = models.IntegerField()
    match_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)      

    def __str__(self):
        winner = ''
        if self.player_a_score < self.player_b_score:
            winner = self.player_b.username
        else:
            winner = self.player_a.username
        return '%s' % (self.player_a.username + " vs " + self.player_b.username + " -- winner: " + winner)
