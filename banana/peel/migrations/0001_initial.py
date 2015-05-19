# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hobby',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('birthdate', models.DateField(blank=True)),
                ('hair_color', models.CharField(blank=True, max_length=128, choices=[(0, b'Black'), (1, b'Brown'), (2, b'Red'), (3, b'Blonde'), (4, b'Salt N Peppa'), (5, b'Green')])),
                ('created', models.DateTimeField(default=datetime.datetime(2015, 5, 18, 11, 15, 42, 916341))),
                ('favorite_hobby', models.OneToOneField(to='peel.Hobby')),
                ('user', models.OneToOneField(to='peel.User')),
            ],
        ),
    ]
