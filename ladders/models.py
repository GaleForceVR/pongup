from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ladder(models.Model):
    name = models.CharField(max_length=200)
    manager = models.ForeignKey(User, related_name='manager', default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return '%s' % (self.name + ": " + "manager = " + (self.manager.username if self.manager and self.manager.username else 'none'))

class User_Ladder(models.Model):
    user = models.ForeignKey(User)
    ladder = models.ForeignKey(Ladder)
    approved = models.BooleanField(default=False)
    ladder_rank = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % (self.ladder.name + ": " + self.user.username + " rank: " + self.ladder_rank.__str__())
