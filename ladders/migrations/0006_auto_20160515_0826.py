# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-15 13:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladders', '0005_auto_20160424_1725'),
    ]

    operations = [
        migrations.AddField(
            model_name='ladder',
            name='end_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ladder',
            name='location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='ladder',
            name='start_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
