from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tag(models.Model):
    type = models.CharField(max_length=40)
    def __str__(self):
        return self.type

class Entry(models.Model):
    author = models.ForeignKey(User, related_name='entries')
    title = models.CharField(max_length=255)
    text = models.TextField()
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return "{}...".format(self.text[:20])
